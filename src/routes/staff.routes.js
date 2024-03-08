import { Router } from "express";
import { loginStaff, logoutStaff, refreshAccessToken, registerStaff } from "../controllers/staff.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/staffAuth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
    {
        name: "photo",
        maxCount: 1
    },
    {
        name: "sign",
        maxCount: 1
    }
]),registerStaff);

router.route("/login").post(loginStaff);



//secured routes
router.route("/logout").post(verifyJWT,logoutStaff);
router.route("/refresh-token").post(refreshAccessToken);



export default router;