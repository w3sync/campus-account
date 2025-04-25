import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB  = async () =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI.trim()}/${DB_NAME}`)
        console.log("Mongo Db connected succsessfull")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}


export default connectDB ;