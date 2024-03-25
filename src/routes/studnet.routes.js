import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyStudentJWT } from "../middlewares/studentAuth.middleware.js";


import {
    registerStudent,
    loginStudent,
    logoutStudent,
    refreshStudentAccessToken,
    changeStudentCurrentPassword,
    getCurrentStudent,
    updateStudentPhoto,
    updateStudentSign
} from "../controllers/student.controller.js";


const router = Router();


router.route("/login").post(loginStudent);

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
]),registerStudent);



//secured routes
router.route("/logout").post(verifyStudentJWT,logoutStudent);
router.route("/refresh-token").post(refreshStudentAccessToken);
router.route("/change-current-password").post(verifyStudentJWT,changeStudentCurrentPassword);
router.route("/update-staff-photo").post(verifyStudentJWT,upload.single("photo"),updateStudentPhoto);
router.route("/update-staff-sign").post(verifyStudentJWT,upload.single("sign"),updateStudentSign);


export default router;