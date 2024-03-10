import { Router } from "express";
import { changeCurrentPassword, loginStaff, logoutStaff, refreshAccessToken, registerStaff, updateStaffPhoto, updateStaffSign } from "../controllers/staff.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/staffAuth.middleware.js";
import { verifyAdmin } from "../middlewares/adminAuth.middlewares.js";

const router = Router();


// unsecured routes 
router.route("/login").post(loginStaff);



// secured routes by Admin
router.route("/register").post(verifyJWT,verifyAdmin,
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




//secured routes
router.route("/logout").post(verifyJWT,logoutStaff);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-current-password").post(verifyJWT,changeCurrentPassword);
router.route("/update-staff-photo").post(verifyJWT,upload.single("photo"),updateStaffPhoto);
router.route("/update-staff-sign").post(verifyJWT,upload.single("sign"),updateStaffSign);



export default router;