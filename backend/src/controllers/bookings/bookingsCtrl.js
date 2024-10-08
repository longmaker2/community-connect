import Booking from "../models/booking.js";
import Service from "../models/service.js";

export const createBookingCtrl = async (req, res) => {
  try {
    const { serviceId, providerId, date, startTime, endTime } = req.body;
    const consumerId = req.user._id;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const newBooking = await Booking.create({
      service: serviceId,
      consumer: consumerId,
      provider: providerId,
      date,
      startTime,
      endTime,
      status: "pending",
    });

    res.status(201).json({ booking: newBooking });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while creating the booking" });
  }
};

export const getAllBookingsCtrl = async (req, res) => {
  try {
    const userId = req.user._id;
    const { role } = req.user;

    let bookings;
    if (role === "consumer") {
      bookings = await Booking.find({ consumer: userId }).populate(
        "service provider"
      );
    } else if (role === "provider") {
      bookings = await Booking.find({ provider: userId }).populate(
        "service consumer"
      );
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized to view these bookings" });
    }

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the bookings" });
  }
};

export const getBookingByIdCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate(
      "service consumer provider"
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the booking" });
  }
};

export const updateBookingStatusCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking: updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong while updating the booking status",
    });
  }
};

export const deleteBookingCtrl = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking successfully deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting the booking" });
  }
};
