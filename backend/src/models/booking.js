import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
