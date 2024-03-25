import mongoose from "mongoose";



const classSchema = new mongoose.Schema({
    name:{type:String,required:true},
    classNum: {type:Number,required:true},
    sec: {type:String, required:true},
    year: {type:Date,required:true},

    isActive:{type:Boolean,default:true},

    desc: {type:String},
    classTeacher: {type:mongoose.Schema.ObjectId,ref:"staff"}
},{timestamps: true})



export const Myclass = new mongoose.model("myclass",classSchema);