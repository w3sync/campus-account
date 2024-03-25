import mongoose, { Schema } from "mongoose";
import { userSchema } from "./user.model.js";
import { acadmicData } from "./staff.model.js";


const tcSchema = new Schema({
    schoolName: {type:String,required:true},
    tcNumber : {type:String, required:true},
    admissionNumber : {type:String},
    date : {type:Date,required:true}
})


const migrationSchema = new Schema({
    schoolName: {type:String,required:true},
    migrationNumber : {type:String, required:true},
    rollNumber : {type:String},
    date : {type:Date,required:true}
})


const studentSchema = userSchema.clone();


studentSchema.add({
    // Admission Number 
    admissionNumber: {
        type: Number,
        unique: true,
    },

    // previos acedmic data 
    fromAnotherSchool : {type:Boolean , required:true},
    previosAcedmicData : {type:acadmicData, required: function(){return this.fromAnotherSchool}},
    tc : {type:tcSchema,required:function(){return this.fromAnotherSchool}},
    migration : {type:migrationSchema,required:function(){return this.fromAnotherSchool}},

})



studentSchema.pre('save', async function (next) {
    const lastStudent = await Student.findOne().sort({ admissionNumber: -1 });
    let newAdmissionNumber;
    if (!lastStudent) newAdmissionNumber = 1;
    else newAdmissionNumber = lastStudent.admissionNumber + 1;
    this.admissionNumber = newAdmissionNumber;
    next();
})



export const Student = mongoose.model("student", studentSchema);