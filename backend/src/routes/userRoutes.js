import express from "express";
import {
  userLoginCtrl,
  userRegistrationCtrl,
  updateUserCtrl,
  getUserProfileCtrl,
} from "../controllers/user/userAuthCtrl.js";
import { protect } from '../middlewares/protect.js';

const router = express.Router();
router.post("/register", userRegistrationCtrl);
router.post("/login", userLoginCtrl);
router.put("/update", protect, updateUserCtrl);
router.get("/profile", protect, getUserProfileCtrl);

export default router;
