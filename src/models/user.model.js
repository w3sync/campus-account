import mongoose, { Schema } from "mongoose";



const userSchema = new Schema({
    firstName: { type: String, required: true, lowercase: true, trim: true, index: true },
    midName: { type: String, lowercase: true, trim: true },
    lastName: { type: String, lowercase: true, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
    nationality: { type: String, enum: ['INDIAN', 'OTHER'] },
    address: { type: String,  },
    residentialAddress: { type: String },
    phone: { type: String,  },
    eamil: { type: String, trim: true, lowercase: true },
    username: { type: String,  trim: true, lowercase: true },
    password: { type: String },
    photo: { type: String },
    sign: { type: String },
    refreshToken: { type: String },
})


export {userSchema}