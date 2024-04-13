import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Fee } from "../models/fee.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";



const ifExist = async (name)=>{
    const fee = await Fee.findOne({name});
    console.log("Fee mode : -",fee)
    if(fee) return true;
    return false;
};



const createFee = asyncHandler(async (req,res)=>{
    const {
        name,
        desc,
        ammount,
        addedBy
    } = req.body;

    if(!(name && ammount)) throw new ApiError(499,"Name and Ammount are required !");
    if(await ifExist(name)) throw new ApiError(409,"Name alredy Exist !!");

    try{
        const fee = await Fee.create({
            name,
            desc,
            ammount,
            addedBy
        });

        return res
        .status(200)
        .json(new ApiResponse(201,fee,"Fee created ScuccessFully !!"));
    } catch(err){
        throw new ApiError(500,err.massage);
    }
});



const removeFee = asyncHandler( async (req,res)=>{
    const {
        feeID
    } = req.body;

    if(!feeID) throw new ApiError(499,"Fee id are required !!")

    try{
        const fee = await Fee.findByIdAndDelete(feeID);
        if(!fee) throw new ApiError(404,"Id not found !")
        return res
        .status(200)
        .json(new ApiResponse(201,fee,"fee Remove Successfull !!"));
    } catch(err){
        throw new ApiError(500,err.massage);
    }
});


const updateFee = asyncHandler( async (req,res)=>{
    const {
        name,
        desc,
        ammount,
        addedBy,
        feeID
    } = req.body;

    if(!feeID) throw new ApiError(499,"Fee Id are required ");

    try{
        const fee = await Fee.findByIdAndUpdate(feeID,{name,desc,ammount, addedBy },{new:true});
        if(!fee) throw new ApiError(404,"Id not found !");
        return res
        .status(200)
        .json(new ApiResponse(200,fee,"Update data sucessfull "));
    }catch (err) {
        throw new ApiError(500,err.massage);
    }
});



export {
    createFee,
    removeFee,
    updateFee
}