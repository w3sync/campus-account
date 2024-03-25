import mongoose from "mongoose";


const teamSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class',
        required:true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"student",
        required: true,
    }
},{timestamps: true})




export const JoinClass = mongoose.model("joinclass",teamSchema);