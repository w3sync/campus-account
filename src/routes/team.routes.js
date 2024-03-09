import { Router } from "express";
import { createTeam, removeTeam } from "../controllers/team.controller.js";

const router = Router();



router.route("/add-member").post(createTeam);
router.route("/remove-member").post(removeTeam);




export default router;