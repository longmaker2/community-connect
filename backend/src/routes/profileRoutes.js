import express from "express";
import {
  createOrUpdateProfile,
  getProfile,
} from "../controllers/profile/profileCtrl.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

// Use `protect` middleware to secure the routes
router.route("/").post(protect, createOrUpdateProfile);
router.route("/:userId").get(protect, getProfile);

export default router;
