import {asyncHandler} from "../utils/asyncHandler.js"


const registerStaff = asyncHandler( async (req,res) =>{
    res.status(200).json({
        message:"ok"
    })
})


export {registerStaff}