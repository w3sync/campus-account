import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyStudentJWT = asyncHandler(async (req, _, next) => {
    const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token ) throw new ApiError(401, "Unauthorized request")
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    try {
        const student = await Student.findById(decodedToken?._id).select("-password -refreshToken")

        if (!student) throw new ApiError(401, "Invalid Access Token");

        req.student = student;
        next();

    } catch (err) {
        // throw err
        throw new ApiError(401, err?.message || "Invalid Acess Token")
    }
})