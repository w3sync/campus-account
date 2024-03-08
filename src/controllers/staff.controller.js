import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { deleteOnCloudinary, uplodeOnCloudinary } from "../utils/cloudinary.js";
import { Staff } from "../models/staff.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { password } from "../constants.js";
import jwt from "jsonwebtoken";

const genrateAccessAndRefereshToken = async (userId) => {
    try {
        const staff = await Staff.findById(userId);
        const accessToken = await staff.genrateAccessToken();
        const refreshToken = await staff.genrateRefreshToken();

        staff.refreshToken = refreshToken;
        await staff.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }

    } catch (err) {
        throw new ApiError(500, "Somthing went wrong while generating referesh and access token")
    }
}

const registerStaff = asyncHandler(async (req, res) => {
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

        //Contect details
        phone,
        eamil,

        //Adress
        permanentAddress,
        sameAsPresent,
        presentAddress,


        // Sesion Details
        role,
        post,
        sallery,
        joiningYear,

        //Acedmic Data
        qualification,

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

        const staff = await Staff.create({
            // Personal Details 
            firstName,
            midName: midName || "",
            lastName: lastName || "",
            fatherName,
            motherName,
            dob,
            gender,
            nationality,

            //Contect details
            phone,
            eamil,


            //Adress
            presentAddress,
            sameAsPresent,
            permanentAddress,

            // Sesion Details
            role,
            post,
            sallery,
            joiningYear,


            //Acedmic Data
            qualification,


            password,

            //Image containt
            photo: photo?.url || "",
            sign: sign?.url || "",

        })

        const createdStaff = await Staff.findById(staff._id).select("-password -refreshToken")
        if (!createdStaff) throw new ApiError(500, "Somthing went wron when register a staff")

        // End database work
        return res.status(200).json(new ApiResponse(201, createdStaff, "Staff register Successfully !!"))
    } catch (err) {
        deleteOnCloudinary(photo?.public_id)
        deleteOnCloudinary(sign?.public_id)
        throw err
    }
})

const loginStaff = asyncHandler(async (req, res) => {
    // get Data 
    // check username and password 
    //find user
    // password check 
    // access and refresh token
    const { username, password } = req.body
    console.log(username, password, "thisfield")
    if (!username || !password) throw new ApiError(400, "Username or Password is Required")
    const staff = await Staff.findOne({ username })
    if (!staff) throw new ApiError(404, "User Dose Not Exist !");
    const isPassValid = await staff.isPasswordCorrect(password);
    if (!isPassValid) throw new ApiError(401, "Invalid user credentials")
    const { accessToken, refreshToken } = await genrateAccessAndRefereshToken(staff._id);
    const loggedInStaff = await Staff.findById(staff._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { staff: loggedInStaff, accessToken, refreshToken }, "Staff logged In successfull !!!"))

})


const logoutStaff = asyncHandler(async (req, res) => {
    await Staff.findByIdAndUpdate(req.staff._id, { $set: { refreshToken: undefined } }, { new: true })
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


const refreshAccessToken = asyncHandler(async (req, res) => {
    console.log("token",req.cookies.refreshToken)
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) throw new ApiError(401, "UnAuthorised Token ")
    try {

        const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const staff = await Staff.findById(decodedToken?._id)
        if (!staff) throw new ApiError(401, "Invalid refresh token")

        console.log(incomingRefreshToken,"\n",staff.refreshToken)
        if (incomingRefreshToken !== staff.refreshToken) throw new ApiError(401, "Refresh token is expired or used")

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await genrateAccessAndRefereshToken(staff._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", refreshToken)
            .json(new ApiResponse(200, { accessToken, refreshToken }, "AccessToken refreshed"))

    } catch (error) {
        throw new ApiError(400,error.message|| "Invalid refresh Token .")
    }

})

const changeCurrentPassword = asyncHandler(async (req,res)=>{
    const {oldPassword, newPassword} = req.body
    if(!newPassword) throw new ApiError(400,"newPassword are required");
    const staff = await Staff.findById(req.staff?._id)
    const isPasswordCorrect = await staff.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect) new ApiError(400,"Invalid Old password");
    staff.password = newPassword;
    await staff.save({validateBeforeSave:false});
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password Changed scucessfully !"))

})












export {
    registerStaff,
    loginStaff,
    logoutStaff,
    refreshAccessToken,
    changeCurrentPassword,
}