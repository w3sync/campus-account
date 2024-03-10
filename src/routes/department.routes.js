import { Router } from "express";
import { chaneDepartmentHead, changeDepartmentName, createDepartment, updateDepartmentDesc } from "../controllers/department.controller.js";
import { verifyJWT } from "../middlewares/staffAuth.middleware.js";
import { verifyForDepartmentHead } from "../middlewares/departmentAuth.middlewares.js";
import {verifyAdmin} from "../middlewares/adminAuth.middlewares.js"


const router = Router();



//secured route 
router.route("/create-department").post(verifyJWT,verifyAdmin,createDepartment);
router.route("/update-department-desc").post( verifyJWT, verifyForDepartmentHead, updateDepartmentDesc);
router.route("/change-department-head").post( verifyJWT, verifyAdmin, chaneDepartmentHead);
router.route("/change-department-name").post( verifyJWT, verifyAdmin, changeDepartmentName);




export default router;