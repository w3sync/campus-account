import mongoose, { Schema } from "mongoose";


const addressSchema = new Schema({
    line1 : {type:String ,required:true },
    line2 : {type:String },
    house : {type:String},
    street : {type:String},
    locality: {type:String , required:true},
    landmark : {type:String},
    city : {type:String,required:true},
    pin: {type:Number,required:true},
    district : {type:String,required:true},
    state: {type:String,required:true},
    coutntry: {type:String,default:"India"}
},{_id:false})

const userSchema = new Schema({
    // Personal Details 
    firstName: { type: String, required: true, lowercase: true, trim: true, index: true },
    midName: { type: String, lowercase: true, trim: true },
    lastName: { type: String, lowercase: true, trim: true },
    fatherName : {type:String,lowercase: true, trim: true , required:true},
    motherName : {type:String,lowercase: true, trim: true , required:true},
    dob: { type: Date , required:true },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] ,required:true },
    nationality: { type: String, enum: ['INDIAN', 'OTHER'] ,required:true },
    pwd: {type:Boolean ,require:true},
    pwdData: {type: String , required: function(){return this.pwd}},

    // Contect Details 
    username: { type: String},
    phone: { type: String, required:true },
    eamil: { type: String, uniqe:true ,trim: true, lowercase: true },
    password: { type: String },


    // Adress details
    presentAddress: addressSchema ,
    sameAsPresent : {type:Boolean, required:true},
    permanentAddress: { type: addressSchema, required:true, default: function(){return this.sameAsPresent?this.presentAddress:null}},


    // Image content
    photo: { type: String },
    sign: { type: String },

    //Token section
    refreshToken: { type: String },
},{timestamps:true})


export {userSchema}