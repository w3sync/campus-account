import { Department } from "../models/department.model.js";
import { Staff } from "../models/staff.model.js";
import { Team } from "../models/team.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const createTeam = asyncHandler(async (req,res)=>{
    // get data from req
    // vailidate data 
    // store on data base
    const {
        member,    
        department
    } = req.body

    if(!(member && department)) throw new ApiError(499,"all Feilds are required !!")

    const isMemberExist = await Staff.findById(member).select("_id");
    if(!isMemberExist) throw new ApiError(404,"Staff dose not Exist ");

    const isDepartmentExist = await Department.findById(department).select("_id");
    if(!isDepartmentExist) throw new ApiError(404, "Department Not Found")

    const isTeamExist = await Team.findOne({$and:[{member},{department}]});
    if(isTeamExist) throw new ApiError(409,"Staff Alredy Added on this Department");
    
    try{
        const team = await Team.create({
            member,
            department
        })
        return res
        .status(200)
        .json(new ApiResponse(200,team,"member Added on department Successfully !!"))
    }catch(err){
        throw new ApiError(500,err.message)
    }
})
 



export{
    createTeam
}