import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { uplodeOnCloudinary } from "../utils/cloudinary.js";
import { Staff } from "../models/staff.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerStaff = asyncHandler( async (req,res) =>{
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


    const {firstName,midName,lastName,dob,gender,nationality,address,residentialAddress,phone,eamil,role ,sallery ,post,qualification ,joiningYear } = req.body
    console.log(firstName,midName,lastName);


    if(
        [firstName,dob,gender,nationality,address,residentialAddress,phone,eamil,role ,sallery ,post,qualification ,joiningYear ].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const photoLocalPath = req.files?.photo[0]?.path ;
    const signLocalPath = req.files?.sign[0]?.path;

    const photo = await uplodeOnCloudinary(photoLocalPath);
    const sign = await uplodeOnCloudinary(signLocalPath);

    const staff = await Staff.create({
        firstName,
        midName : midName || "",
        lastName : lastName || "",
        dob,
        gender,
        nationality,
        address,
        residentialAddress,
        phone,
        eamil,
        role,
        sallery,
        post,
        qualification,
        joiningYear,
        photo : photo?.url || "",
        sign : sign?.url || "",
    })

    const createdStaff = await Staff.findById(staff._id).select("-password -refreshToken")
    if(!createdStaff) throw new ApiError(500,"Somthing went wron when register a staff")
    
    return res.status(200).json(new ApiResponse(200,createdStaff,"Staff register Successfully !!"))
})


export {registerStaff}