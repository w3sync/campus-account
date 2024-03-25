import mongoose from "mongoose";
import { userSchema } from "./user.model.js";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { usernamePrifix } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";


const acadmicData = mongoose.Schema({
    examinationName : {type:String , required:true},
    bordName : {type:String , required:true},
    yearOfPassing : {type:String, required:true},
    rollNumber : {type:Number, required: true},
    gradingSystem: {type: String,required:true,enum: ['percentage', 'letterGrade']},
    grade: {type:String , required: function(){this.gradingSystem === 'latterGrade'? true:false}},
    perentage : {type:Number,required: function(){this.gradingSystem === 'percentage'? true:false}},
    totalMarks : {type:Number},
    obtainMarks: {type:Number},

},{_id:false})

const staffSchema = userSchema.clone();

staffSchema.add({
        // Sesion Details
        role : {type:String , enum: ["TEACHER","NON-TEACHING","HEAD","TECHNICAL","ACCOUNT","EXAM"], required:true},
        post: {type:String , required: true},
        sallery : {type:Number},
        joiningYear : {type:String, required:true},


        //acadmicData
        qualification : [acadmicData],


})
 


staffSchema.pre('save',async function (next) {
    if(! this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
}) 




const checkUsername = async function(username){
    const userExist = await Staff.findOne({username:username},"username")
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

staffSchema.pre('save',async function(next){
    if(! this.isModified("firstName")) return next();
    this.username = await genrateUsername(this.firstName,this.midName,this.lastName);
    console.log({"user":this.username})
    next();
})







staffSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

staffSchema.methods.genrateAccessToken = async function() {
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
staffSchema.methods.genrateRefreshToken = async function() {

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


export  const  Staff = mongoose.model("staff",staffSchema);
export { acadmicData};