import mongoose from "mongoose";
import { Team } from "./team.model.js";


const departmentSchema = new mongoose.Schema({
    name: {type:String, required:true},
    desc: {type:String,required:true},
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff',
        required:true, 
    }
},{timestamps: true})



departmentSchema.pre('save',async function(next){
    this.isModified("head") ? this.isModifiedHead = true: this.isModifiedHead = false;
    next();
})

departmentSchema.post('save',async function(){
    if(this.isModifiedHead){
        await Team.create({
            member: this.head,
            department : this._id
        })
    }
})


export const  Department = mongoose.model("department",departmentSchema);