import { Router } from "express";
import { createDepartment, updateDepartmentDesc } from "../controllers/department.controller.js";
import { verifyJWT } from "../middlewares/staffAuth.middleware.js";
import { verifyForDepartment } from "../middlewares/departmentAuth.middlewares.js";

const router = Router();

router.route("/create-department").post(createDepartment)


//secured route 
router.route("/update-department-desc").post( verifyJWT, verifyForDepartment, updateDepartmentDesc);
export default router;