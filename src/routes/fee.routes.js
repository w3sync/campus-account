import  Router  from "express";
import { createFee, removeFee, updateFee } from "../controllers/fee.controller.js";


const router = Router();


router.route("/create-fee").post(createFee);
router.route("/remove-fee").post(removeFee);
router.route("/update-fee").patch(updateFee);






export default router;