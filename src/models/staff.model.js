import mongoose from "mongoose";
import { userSchema } from "./user.model.js";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";


const staffSchema = userSchema.extend({
        role : {type:String , enum: ["TEACHER","NON-TEACHING","HEAD","TECHNICAL","ACCOUNT","EXAM"]},
        sallery : {type:Number},
        post: {type:String},
        qualification : {type:String},
        joiningYear : {type:String},
})



staffSchema.pre('save',async function (next) {
    if(! this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
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