import { Router } from "express";
import { loginStaff, registerStaff } from "../controllers/staff.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

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
]),registerStaff)

router.route("/login").post(loginStaff)

export default router;