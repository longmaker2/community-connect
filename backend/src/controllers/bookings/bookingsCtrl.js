import Booking from "../../models/booking.js";

export const createBooking = async (req, res) => {
  try {
    const { date, timeSlot } = req.body;

    console.log("Received booking data:", { date, timeSlot });

    if (!date || !timeSlot) {
      console.error("Missing fields: ", { date, timeSlot });
      return res.status(400).json({
        message: "All fields (date, timeSlot) are required.",
      });
    }

    const newBooking = new Booking({ date, timeSlot });
    await newBooking.save();

    console.log("Booking created successfully: ", newBooking);

    res.status(201).json({
      message: "Booking created successfully.",
      booking: newBooking,
    });
  } catch (error) {
    console.error(`Error creating booking: ${error.message}`, error);
    res
      .status(500)
      .json({ message: `Error creating booking: ${error.message}` });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (bookings.length === 0) {
      return res.status(200).json({ message: "No bookings found." });
    }
    res.status(200).json({
      message: `${bookings.length} booking(s) retrieved successfully.`,
      bookings,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving bookings: ${error.message}` });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({
      message: "Booking retrieved successfully.",
      booking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving booking: ${error.message}` });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({
      message: "Booking updated successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating booking: ${error.message}` });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting booking: ${error.message}` });
  }
};
