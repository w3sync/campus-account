import mongoose, { Schema } from "mongoose";



const userSchema = new Schema({
    firstName: { type: String, required: true, lowercase: true, trim: true, index: true },
    midName: { type: String, lowercase: true, trim: true },
    lastName: { type: String, lowercase: true, trim: true },
    dob: { type: Date },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
    nationality: { type: String, enum: ['INDIAN', 'OTHER'] },
    address: { type: String, required: true },
    residentialAddress: { type: String },
    phone: { type: String, required: true },
    eamil: { type: String, required: true, trim: true, lowercase: true },
    username: { type: String, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    photo: { type: String },
    sign: { type: String },
    refreshToken: { type: String },
}, { collection: 'users', discriminatorKey: '_type' })


export { userSchema };