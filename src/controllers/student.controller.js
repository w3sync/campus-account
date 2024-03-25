import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { deleteOnCloudinary, deleteOnCloudinaryByUrl, uplodeOnCloudinary } from "../utils/cloudinary.js";
import { Student } from "../models/student.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { password } from "../constants.js";
import jwt from "jsonwebtoken";



const genrateAccessAndRefereshToken = async (userId) => {
    try {
        const student = await Student.findById(userId);
        const accessToken = await student.genrateAccessToken();
        const refreshToken = await student.genrateRefreshToken();

        student.refreshToken = refreshToken;
        await student.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }

    } catch (err) {
        throw new ApiError(500, "Somthing went wrong while generating referesh and access token")
    }
} 


 const registerStudent = asyncHandler(async (req, res) => {
    // return res.status(200).json(new ApiResponse(200,req.body,"try"))
    // get all data of staff
    // check validation
    // save on database
    // check if username
    // uplode on cloudnery 
    // check img
    // staff obj
    // create 
    // remove ref token and password 
    // check for user creation

    const {
        // Personal Details 
        firstName,
        midName,
        lastName,
        fatherName,
        motherName,
        dob,
        gender,
        nationality,
        pwd,
        pwdData,

        //Contect details
        phone,
        eamil,

        //Adress
        permanentAddress,
        sameAsPresent,
        presentAddress,


        //Student data 
        fromAnotherSchool,
        previosAcedmicData,
        tc,
        migration,

    } = req.body;



    // cloudinary work
    let photoLocalPath = "";
    let signLocalPath = "";

    if (req.files?.photo) {
        photoLocalPath = req.files?.photo[0]?.path;
    }
    if (req.files?.sign) {
        signLocalPath = req.files?.sign[0]?.path;
    }


    const photo = await uplodeOnCloudinary(photoLocalPath);
    const sign = await uplodeOnCloudinary(signLocalPath);
    // End cloudinary work 



    // Database work 

    try {

        const student = await Student.create({
            // Personal Details 
            firstName,
            midName: midName || "",
            lastName: lastName || "",
            fatherName,
            motherName,
            dob,
            gender,
            nationality,
            pwd,
            pwdData,

            //Contect details
            phone,
            eamil,


            //Adress
            presentAddress,
            sameAsPresent,
            permanentAddress,

            // Student Data
            fromAnotherSchool,
            previosAcedmicData,
            tc,
            migration,


            password,

            //Image containt
            photo: photo?.url || "",
            sign: sign?.url || "",

        })

        const createdStudent = await Student.findById(student._id).select("-password -refreshToken")
        if (!createdStudent) throw new ApiError(500, "Somthing went wron when register a Studnet")

        // End database work
        return res.status(200).json(new ApiResponse(201, createdStudent, "Student register Successfully !!"))
    } catch (err) {
        deleteOnCloudinary(photo?.public_id)
        deleteOnCloudinary(sign?.public_id)
        throw err
    }
})



const loginStudent = asyncHandler(async (req, res) => {
    // get Data 
    // check username and password 
    //find user
    // password check 
    // access and refresh token
    const { username, password } = req.body
    if (!username || !password) throw new ApiError(400, "Username or Password is Required")
    const student = await Student.findOne({ username })
    if (!student) throw new ApiError(404, "User Dose Not Exist !");
    const isPassValid = await student.isPasswordCorrect(password);
    if (!isPassValid) throw new ApiError(401, "Invalid user credentials")
    const { accessToken, refreshToken } = await genrateAccessAndRefereshToken(student._id);
    const loggedInStudent = await Student.findById(student._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { student: loggedInStudent, accessToken, refreshToken }, "Student logged In successfull !!!"))

})


const logoutStudent = asyncHandler(async (req, res) => {
    await Student.findByIdAndUpdate(req.student._id, { $set: { refreshToken: undefined } }, { new: true })
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", options)
        .cookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))

})


const refreshStudentAccessToken = asyncHandler(async (req, res) => {
    console.log("token", req.cookies.refreshToken)
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) throw new ApiError(401, "UnAuthorised Token ")
    try {

        const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const student = await Student.findById(decodedToken?._id)
        if (!student) throw new ApiError(401, "Invalid refresh token")

        console.log(incomingRefreshToken, "\n", student.refreshToken)
        if (incomingRefreshToken !== student.refreshToken) throw new ApiError(401, "Refresh token is expired or used")

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await genrateAccessAndRefereshToken(student._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken,options)
            .json(new ApiResponse(200, { accessToken, refreshToken }, "AccessToken refreshed"))

    } catch (error) {
        throw new ApiError(400, error.message || "Invalid refresh Token .")
    }

})


const changeStudentCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!newPassword) throw new ApiError(400, "newPassword are required");
    const student = await Student.findById(req.student?._id)
    const isPasswordCorrect = await student.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) new ApiError(400, "Invalid Old password");
    student.password = newPassword;
    await student.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed scucessfully !"))

})



const getCurrentStudent = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.student, "current user fetcched successfully "))

})

const updateStudentPhoto = asyncHandler(async (req, res) => {
    const studentPhotoLocalPath = req.file?.path
    if (!studentPhotoLocalPath) throw new ApiError(400, "Photo File is Missing ")
    const photo = await uplodeOnCloudinary(studentPhotoLocalPath);
    if (!photo?.url) throw new ApiError(400, "error on uploding Image");
    const student = await Student.findById(req.student?._id).select("-password -refreshToken");
    if(!student) throw new ApiError(500,"Error while finding student for update photo")
    await deleteOnCloudinaryByUrl(student.photo)
    student.photo = photo?.url;
    
    const updatedStudent = await student.save()// await Student.findById(req.student?._id).select();
    
    return res
    .status(200)
    .json(new ApiResponse(200,updatedStudent,"Photo uploded successfull"))

})


const updateStudentSign = asyncHandler(async (req, res) => {
    const studentSignLocalPath = req.file?.path
    if (!studentSignLocalPath) throw new ApiError(400, "Sign File is Missing ")
    const sign = await uplodeOnCloudinary(studentSignLocalPath);
    if (!sign?.url) throw new ApiError(400, "error on uploding Image");
    const student = await Student.findById(req.student?._id).select("-password -refreshToken");
    if(!student) throw new ApiError(500,"Error while finding student for update sign")
    await deleteOnCloudinaryByUrl(student.sign)
    student.sign = sign?.url;
    
    const updatedStudent = await student.save()// await Student.findById(req.student?._id).select();
    
    return res
    .status(200)
    .json(new ApiResponse(200,updatedStudent,"sign uploded successfull"))

})


export {
    registerStudent,
    loginStudent,
    logoutStudent,
    refreshStudentAccessToken,
    changeStudentCurrentPassword,
    getCurrentStudent,
    updateStudentPhoto,
    updateStudentSign
}