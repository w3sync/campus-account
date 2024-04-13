import { Router } from "express";
import { createFeeMode, removeFeeMode, updateFeeMode } from "../controllers/feeMode.controller.js";



const router = Router();


router.route("/create-fee-mode").post(createFeeMode);
router.route("/remove-fee-mode").post(removeFeeMode);
router.route("/update-fee-mode").patch(updateFeeMode);


export default router;