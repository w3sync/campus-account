import dotenv from "dotenv"
import connectDB from "./db/conn.js"
import { app } from "./app.js"
import { seedData } from "./utils/seedDataInfeeMode.js"



dotenv.config({
    path: '.env'
})



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log("Server fis running at port : ",process.env.PORT);
    })
    seedData()
    .then(()=>{
        console.log("seed data run success");
    })
    .catch((err)=> console.log(err))
})
.catch((err)=>{
    console.log("Mongo db connection failed",err)
})
