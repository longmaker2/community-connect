import express from "express";
import {
  createReview,
  getReviewsByService,
} from "../controllers/reviews/reviewsCtrl.js";

const router = express.Router();

router.get("/service/:serviceId", getReviewsByService);

router.post("/", createReview);

export default router;
