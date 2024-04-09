import mongoose  from "mongoose";


const feeSchema = new mongoose.Schema({
    name:{type:String ,required:true},
    desc : {type:String, required:true},
    ammount : {type:Number, required:true},
    addedBy : {type:mongoose.Schema.ObjectId, ref:'staff',required:true}
},{timestamps:true})






export const Fee = mongoose.model('fee',feeSchema);