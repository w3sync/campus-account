import mongoose from "mongoose";
import { userSchema } from "./user.model.js";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { usernamePrifix } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";


const staffSchema = userSchema.clone();

staffSchema.add({
        role : {type:String , enum: ["TEACHER","NON-TEACHING","HEAD","TECHNICAL","ACCOUNT","EXAM"]},
        sallery : {type:Number},
        post: {type:String},
        qualification : {type:String},
        joiningYear : {type:String},
})
 


staffSchema.pre('save',async function (next) {
    if(! this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    this.username = await 
    next();
})


staffSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

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

staffSchema.methods.genrateAccessToken = async function() {
    return await jwt.sign(
        {
            _id: this._id,
            username : this.username,
            email : this.email,
            role : this.role
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