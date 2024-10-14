import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/bookings/bookingsCtrl.js";

const router = express.Router();

// POST route for creating a booking
router.post("/", createBooking);

// GET all bookings
router.get("/", getAllBookings);

// GET a booking by ID
router.get("/:id", getBookingById);

// PUT to update a booking
router.put("/:id", updateBooking);

// DELETE a booking
router.delete("/:id", deleteBooking);

export default router;
