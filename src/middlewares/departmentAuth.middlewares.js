import { Department } from "../models/department.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";





const verifyForDepartmentHead = asyncHandler(async (req,_,next)=>{
    const staffId = req.staff?._id;
    if(!staffId) throw new ApiError(404,"Id not found while verify department ");
    const department = await Department.findById(req.body?.departmentID);
    if(!department) throw new ApiError(404,"Department not found !!");
    if(department?.head.toString() !==staffId.toString()) throw new ApiError(403,"access to the requested resource is forbidden");
    next();
})




export{
    verifyForDepartmentHead
}