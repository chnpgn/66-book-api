import { Router } from "express";

import {
  getPassage,
  getRandomVerse,
  getDailyVerse,
} from "../controllers/passages.controller.js";

export const router = Router();

router.get("/", getPassage);
router.get("/random", getRandomVerse);
router.get("/daily", getDailyVerse);
