import { Router } from "express";
import {
    joinStudentToClass,
    removeStudentFromClass,
} from "../controllers/joinClass.controller.js";

const router = Router();

router.route("/add-student").post(joinStudentToClass);
router.route("/remove-student").post(removeStudentFromClass);

export default router;