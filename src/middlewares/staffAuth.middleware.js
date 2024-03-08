import { Staff } from "../models/staff.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token ) throw new ApiError(401, "Unauthorized request")
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const staff = await Staff.findById(decodedToken?._id).select("-password -refreshToken")

        if (!staff) throw new ApiError(401, "Invalid Access Token");

        req.staff = staff;
        next();

    } catch (err) {
        // throw err
        throw new ApiError(401, err?.message || "Invalid Acess Token")
    }
})