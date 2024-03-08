import mongoose from "mongoose";


const teamSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff',
        required:true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"department",
        required: true,
    }
},{timestamps: true})




export const Team = mongoose.model("team",teamSchema);