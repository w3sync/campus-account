import  Express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = Express();


app.use(cors({
    origin: process.env.CORS_ORIGIN?.trim(),
    credentials: true
}))
app.use(Express.json({
    limit: "16kb"
}))
app.use(Express.urlencoded({extended: true, limit: "16kb"}))
app.use(Express.static("public"))
app.use(cookieParser())



//Routes import
import staffRouter from "./routes/staff.routes.js"
import departmentRouter from "./routes/department.routes.js"
import teamRouter from "./routes/team.routes.js"
import classRouter from "./routes/class.routes.js"
import joinClassRouter from "./routes/joinClass.routes.js"
import studentRouter from "./routes/studnet.routes.js"
import feeModeRouter from "./routes/feeMode.routes.js"
import feeRouter from "./routes/fee.routes.js"
//route decleration 

app.use("/api/v1/staff",staffRouter);
app.use("/api/v1/department",departmentRouter);
app.use("/api/v1/team",teamRouter);
app.use("/api/v1/class",classRouter);
app.use("/api/v1/join-class",joinClassRouter);
app.use("/api/v1/student",studentRouter);
app.use("/api/v1/fee-mode",feeModeRouter);
app.use("/api/v1/fee",feeRouter);


export { app }