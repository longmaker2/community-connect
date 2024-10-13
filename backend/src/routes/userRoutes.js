import express from "express";
import {
  userLoginCtrl,
  userRegistrationCtrl,
  updateUserCtrl,
} from "../controllers/user/userAuthCtrl.js";
import { protect } from '../middlewares/protect.js';

const router = express.Router();
router.post("/register", userRegistrationCtrl);
router.post("/login", userLoginCtrl);
router.put("/update", protect, updateUserCtrl);

export default router;
