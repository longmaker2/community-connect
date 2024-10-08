import express from "express";
import {
  createServiceCtrl,
  getServiceCtrl,
  searchServicesCtrl,
} from "../controllers/serviceController.js";
import {
  createBookingCtrl,
  getAllBookingsCtrl,
  getBookingByIdCtrl,
  updateBookingStatusCtrl,
  deleteBookingCtrl,
} from "../controllers/bookingCtrl.js";
import { protect } from "../middleware/authMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);


router.post("/services", protect, createServiceCtrl);
router.get("/services/provider/:id", getServiceCtrl);
router.get("/services/search", searchServicesCtrl);
router.post("/services/book", createBookingCtrl);
router.get("/services/bookings", getAllBookingsCtrl);
router.get("/services/book/:id", getBookingByIdCtrl);
router.put("/services/book/:id/status", updateBookingStatusCtrl);
router.delete("/services/book/:id", deleteBookingCtrl);

export default router;
