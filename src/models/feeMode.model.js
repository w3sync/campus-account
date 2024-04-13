import mongoose from "mongoose";



const feeModeSchema = new mongoose.Schema({
    name : {type:String,required:true},
    desc : {type:String,required:true},

},{timestamps:true})


export const FeeMode = mongoose.model("feemode",feeModeSchema);

