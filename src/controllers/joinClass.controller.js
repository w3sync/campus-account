import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Myclass} from "../models/class.model.js";
import { Student } from "../models/student.model.js";
import { JoinClass } from "../models/joinClass.model.js";



const joinStudentToClass = asyncHandler(async (req,res)=>{
    // get data from req
    // vailidate data 
    // store on data base
    const {
        student,    
        classId
    } = req.body

    if(!(student && classId)) throw new ApiError(499,"all Feilds are required !!")

    const isstudentExist = await Student.findById(student).select("_id");
    if(!isstudentExist) throw new ApiError(404,"Student dose not Exist ");

    const isClassExist = await Myclass.findById(classId).select("_id");
    if(!isClassExist) throw new ApiError(404, "Class Not Found")

    const isJoinClassExist = await JoinClass.findOne({$and:[{student},{classId}]});
    if(isJoinClassExist) throw new ApiError(409,"Student Alredy Added on this Class");

    try{
        const joinClass = await JoinClass.create({
            student,
            classId
        })
        return res
        .status(200)
        .json(new ApiResponse(200,joinClass,"student Added on Class Successfully !!"))
    }catch(err){
        throw new ApiError(500,err.message)
    }
})


const removeStudentFromClass = asyncHandler(async (req,res)=>{
    // get data from req
    // remove from database
    // send success msg

    const {
        student,
        classId
    } = req.body

    if(!(student && classId)) throw new ApiError(499,"all Feilds are required !!")

    const joinClass = await JoinClass.findOneAndDelete({$and:[{student},{classId}]});
    if(!joinClass) throw new ApiError(404,"Invailid Credential !!")
    return res
    .status(200)
    .json(new ApiResponse(202,{},"Staff removed Successfully !!"))
})

export  {
    joinStudentToClass,
    removeStudentFromClass,
}