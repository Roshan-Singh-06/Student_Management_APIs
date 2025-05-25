import express from "express";
import { addSchool, listSchools } from "../controllers/schoolController.js";
import { validateAddSchool, validateListSchools } from "../middleware/schoolValidation.js";

const router = express.Router();

router.post("/addSchool", validateAddSchool, addSchool);
router.get("/listSchools", validateListSchools, listSchools);

export default router;