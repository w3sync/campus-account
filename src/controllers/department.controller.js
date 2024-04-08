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


const changeDepartmentName = asyncHandler(async (req,res)=>{
    const {
        departmentID,
        newName
    } = req.body

    if(!newName) throw new ApiError(499,"All fields are required !!")

    const department = await Department.findByIdAndUpdate(departmentID,{name:newName},{new:true});
    if(!department) throw new ApiError(404,"Department not found !!");

    return res
    .status(200)
    .json(new ApiResponse(200,{department},"Department Name Changed Successfully !!"));
})


const chaneDepartmentHead = asyncHandler(async (req,res)=>{
    const {
        departmentID,
        head
    } = req.body;
    if(!head) throw new ApiError(499,"All fields are required ")

    const staff = await Staff.findById(head);
    if(!staff) throw new ApiError(404,"Staff dose not exist !!");

    const  department = await Department.findByIdAndUpdate(departmentID,{head:head},{new:true})
    if(!department) throw new ApiError(404,"Department Not found !!");
    
    return res
    .status(200)
    .json(new ApiResponse(200,{department},"Head of department changed successfully !!"))
})

const getAllDepartment = asyncHandler(async (_,res)=>{
    const department =  await Department.aggregate([
        {
            $lookup: {
                from:"staffs",
                localField: "head",
                foreignField:"_id",
                as: "headName",
            }
        },
        {
            $addFields: {
                "headFullName": {
                    $concat:[
                        {$first:"$headName.firstName"},
                        " ",
                        {$first:"$headName.midName"},
                        " ",
                        {$last:"$headName.lastName"},
                    ]
                }
              }
           
        },
        {
            $project: {
                "_id":1,
                "name":1,
                "headFullName":1
            }
        },
      

    ])

    return res
    .status(200)
    .json(new ApiResponse(200,department,"get all department"));
})

export {
    createDepartment,
    updateDepartmentDesc,
    changeDepartmentName,
    chaneDepartmentHead,
    getAllDepartment,
}