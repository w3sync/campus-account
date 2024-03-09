import { Router } from "express";
import { createTeam } from "../controllers/team.controller.js";

const router = Router();



router.route("/add-member").post(createTeam)




export default router;