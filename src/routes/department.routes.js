import { Router } from "express";
import { chaneDepartmentHead, changeDepartmentName, createDepartment, getAllDepartment, updateDepartmentDesc } from "../controllers/department.controller.js";
import { verifyJWT } from "../middlewares/staffAuth.middleware.js";
import { verifyForDepartmentHead } from "../middlewares/departmentAuth.middlewares.js";
import {verifyAdmin} from "../middlewares/adminAuth.middlewares.js"


const router = Router();



//secured route 
router.route("/create-department").post(createDepartment);
router.route("/update-department-desc").post(updateDepartmentDesc);
router.route("/change-department-head").post(  chaneDepartmentHead);
router.route("/change-department-name").post( changeDepartmentName);
router.route("/get-all-department").post(getAllDepartment);


 

export default router;