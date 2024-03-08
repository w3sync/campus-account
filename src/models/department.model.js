import mongoose from "mongoose";


const departmentSchema = new mongoose.Schema({
    name: {type:String, required:true},
    desc: {type:String,required:true},
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff',
        required:true,
    }
},{timestamps: true})




export const  Department = mongoose.model("department",departmentSchema);