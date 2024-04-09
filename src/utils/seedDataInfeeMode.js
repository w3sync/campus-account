import mongoose from "mongoose";
import { feeModeSchema } from "../models/feeMode.model.js";



const initialData  = [
    {
        name:"JAN",
        desc:"demo"
    },
    {
        name:"FEB",
        desc:"demo"
    },
    {
        name:"MAR",
        desc:"demo"
    },
    {
        name:"APR",
        desc:"demo"
    },
    {
        name:"MAY",
        desc:"demo"
    },
    {
        name:"JUN",
        desc:"demo"
    },
    {
        name:"JUL",
        desc:"demo"
    },
    {
        name:"AUG",
        desc:"demo"
    },
    {
        name:"SEP",
        desc:"demo"
    },
    {
        name:"OCT",
        desc:"demo"
    },
    {
        name:"NOV",
        desc:"demo"
    },
    {
        name:"DEC",
        desc:"demo"
    },
]

export const seedData = async () =>{   
    const feeMode = await mongoose.connection.db.collection('feemodes');
    if(!await feeMode.findOne()) feeMode.insertMany(initialData);
   
}

