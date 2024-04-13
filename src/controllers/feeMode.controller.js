import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {FeeMode} from "../models/feeMode.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const ifExist = async (name)=>{
    const feeMode = await FeeMode.findOne({name});
    console.log("Fee mode : -",feeMode)
    if(feeMode) return true;
    return false;
}

const createFeeMode = asyncHandler( async (req,res)=>{
    const { name, desc } = req.body;
    if(!( name && desc )) throw new ApiError(499,"all Feilds are required !!");
    if(await ifExist(name)) throw new ApiError(409,"Alredy exisest");
    try {
        const feeMode = await FeeMode.create({
            name,
            desc
        });
        return res
        .status(200)
        .json(new ApiResponse(201,feeMode,"FeeMode added successfully  "))


    }catch(err){
        throw new ApiError(500,err.message)
    }
    
})




const removeFeeMode = asyncHandler( async (req,res)=>{
    const { feeModeId } = req.body;
    if(! feeModeId) throw new ApiError(499,"all Feilds are required !!");

    try{
        const feeMode = await FeeMode.findByIdAndDelete(feeModeId);
        if(! feeMode) throw new ApiError(404,"Id not matched");
        return res
        .status(200)
        .json(new ApiResponse(200,feeMode,"FeeMode remove successfully "))
    }
    catch(err){
        throw new ApiError(500,err.message)
    }
})


const updateFeeMode = asyncHandler( async (req,res) =>{
    const {feeModeId ,name , desc} = req.body;
    if(!(name || desc)) throw new ApiError(499,"Feilds are required !!");
    if(await ifExist(name)) throw new ApiError(409,"Alredy exisest");
    try{
        const feeMode = await FeeMode.findByIdAndUpdate(feeModeId,{name,desc},{new:true});
        if(!feeMode) throw new ApiError(404, "Id not found ");
        return res
        .status(200)
        .json(new ApiResponse(200,feeMode,"Update Scuccessfully !!"))
    }
    catch(err){
        throw new ApiError(500,err.message)
    }

})

export {
    createFeeMode,
    removeFeeMode,
    updateFeeMode
}