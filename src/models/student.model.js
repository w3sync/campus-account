import mongoose, { Schema } from "mongoose";
import { userSchema } from "./user.model.js";
import { acadmicData } from "./staff.model.js";
import bcrypt from "bcrypt"
import { usernamePrifix } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"


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

studentSchema.pre('save',async function(next){
    if(!this.isModified("password")) return  next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})


const checkUsername = async function(username){
    const userExist = await Student.findOne({username:username},"username")
    if(userExist) return false;
    return true;
}

const genrateUsername = async function(firstName,midName="",lastName=""){
    if(!firstName) throw new ApiError(400,"First Name is required !!")
    let num =1
    let username = usernamePrifix.concat(".",firstName);
    if(midName) username = username.concat(".",midName);
    if(lastName) username = username.concat(".",lastName);
    if(await checkUsername(username)) return username;
    for(let i=0;i<5;i++){
        let tempUsername = username.concat(".",num);
        if(await checkUsername(tempUsername)) return tempUsername;
        num++;
    }
    throw new ApiError(429,"Username Limite Accessed !!");
}

studentSchema.pre('save',async function(next){
    if(! this.isModified("firstName")) return next();
    this.username = await genrateUsername(this.firstName,this.midName,this.lastName);
    console.log({"user":this.username})
    next();
})








studentSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}







studentSchema.methods.genrateAccessToken = async function() {
    return await jwt.sign(
        {
            _id: this._id,
            username : this.username,
            email : this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
studentSchema.methods.genrateRefreshToken = async function() {

    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}







export const Student = mongoose.model("student", studentSchema);