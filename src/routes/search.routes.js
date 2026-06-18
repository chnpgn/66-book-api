import { Router } from "express";
import { searchVerses } from "../controllers/search.controller.js";

const router = Router();

router.get("/", searchVerses);

export default router;
