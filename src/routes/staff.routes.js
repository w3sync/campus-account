import { Router } from "express";
import { changeCurrentPassword, loginStaff, logoutStaff, refreshAccessToken, registerStaff, updateStaffPhoto, updateStaffSign } from "../controllers/staff.controller.js";
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
router.route("/change-current-password").post(verifyJWT,changeCurrentPassword);
router.route("/update-staff-photo").post(verifyJWT,upload.single("photo"),updateStaffPhoto);
router.route("/update-staff-sign").post(verifyJWT,upload.single("sign"),updateStaffSign);



export default router;