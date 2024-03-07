import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { deleteOnCloudinary, uplodeOnCloudinary } from "../utils/cloudinary.js";
import { Staff } from "../models/staff.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { password } from "../constants.js";




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

    return res.status(200).json(new ApiResponse(200, {}, "login staff"))
})
export { registerStaff, loginStaff }