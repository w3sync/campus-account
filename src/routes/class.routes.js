 import { Router } from "express";
 import { createClass,
        updateClassDesc,
        changeClassName,
        chaneClassTeacher,
        deactivetClass
} from "../controllers/class.controller.js";


 const router = Router();



 router.route("/create-class").post(createClass);
 router.route("/update-class-desc").post(updateClassDesc);
 router.route("/change-class-name").post(changeClassName);
 router.route("/change-class-teacher").post(chaneClassTeacher);
 router.route("/deactivet-class").post(deactivetClass);


 export default router;