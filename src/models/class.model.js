import mongoose from "mongoose";



const classSchema = new mongoose.Schema({
    name:{type:String,required:true},
    class: {type:Number,required:true},
    sec: {type:String, required:true},
    year: {type:Date,required:true},

    isActiv:{type:Boolean,required:true},

    desc: {type:String},
    classTeacher: {type:mongoose.Schema.ObjectId,ref:"staff"}
},{timestamps: true})



export const Class = new mongoose.model("class",classSchema);