import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import {
  createConversationCtrl,
  getConversationCtrl,
  getOurConversationCtrl,
} from "../../controllers/chats/conversationCtrl.js";

const router = express.Router();

// Apply `authMiddleware` to protect these routes
router.post("/new", authMiddleware, createConversationCtrl);
router.get("/:userId", authMiddleware, getConversationCtrl);
router.get(
  "/our/:firstUserId/:secondUserId",
  authMiddleware,
  getOurConversationCtrl
);

export default router;
