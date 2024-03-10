import { Admin } from "../constants.js";
import { Team } from "../models/team.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";






const verifyAdmin = asyncHandler(async (req,_,next)=>{
    const isAdmin = await Team.findOne({$and:[{member:req.staff?._id},{department: Admin }]})
    if(!isAdmin) throw new ApiError(403,"access to the requested resource is forbidden")
    next();
})

export{
    verifyAdmin
}