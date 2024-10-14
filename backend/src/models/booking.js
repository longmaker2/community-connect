import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    serviceProvider: { type: String, required: true },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
