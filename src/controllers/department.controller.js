import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Department} from "../models/department.model.js"
import {Staff} from "../models/staff.model.js"




const createDepartment = asyncHandler(async (req,res) =>{
    //get data from req
    //check authraization 
    //create department 
    // return department
    const {
        name,
        desc,
        head
    } = req.body

    if(!(name && desc && head)) throw new ApiError(499,"All Field is required !!")

    const isDepartmentExist = await Department.findOne({name}).select("_id");
    if(isDepartmentExist) throw new ApiError(409,"Department Alredy exist");

    const isStaffExist = await Staff.findById(head).select("_id")
    if(!isStaffExist) throw new ApiError(404,"Staf dose not exist")
    
    try {
        const department = await Department.create({
            name,
            desc,
            head
        })
        return res
        .status(200)
        .json(new ApiResponse(200,{department},"Department Created Successfully !!"))
    } catch (err) {
        throw new ApiError(500,err.message);
    }


})


const updateDepartmentDesc = asyncHandler(async (req,res)=>{
    // get data from req
    // update data on database
    // return new data 
    const {
        departmentID,
        desc
    } = req.body

    if(!desc) throw new ApiError(499,"All fields are required !!");

    const department = await Department.findByIdAndUpdate(departmentID,{desc},{new:true})
    if(!department) throw new ApiError(404,"Department not found ");
    return res
        .status(200)
        .json(new ApiResponse(200,{department},"Department desc updated Successfully !!"))
})


export {
    createDepartment,
    updateDepartmentDesc
}