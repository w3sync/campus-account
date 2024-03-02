import { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = Express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(Express.json({
    limit:"16kb"
}))

app.use(Express.urlencoded({limit:"16kb"}))

app.use(Express.static("public"))
app.use(cookieParser())




export {app}