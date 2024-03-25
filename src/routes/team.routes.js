import { Router } from "express";
import { createTeam, removeTeam } from "../controllers/team.controller.js";
import { verifyJWT } from "../middlewares/staffAuth.middleware.js";
import { verifyAdmin } from "../middlewares/adminAuth.middlewares.js";

const router = Router();



router.route("/add-member").post(  createTeam);
router.route("/remove-member").post(  removeTeam);




export default router;