import express from "express";
import {
  createReview,
  getReviewsByService,
} from "../controllers/reviews/reviewsCtrl.js";

const router = express.Router();

router.get("/:serviceId", getReviewsByService);

router.post("/", createReview);

export default router;
