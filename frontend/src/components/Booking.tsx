import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  setBookingDate,
  setTimeSlot,
  addBooking,
} from "../features/bookingSlice";
import { baseURL } from "../utils/baseURL";
import { ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface BookingProps {
  serviceId: string;
}

const Booking: React.FC<BookingProps> = ({ serviceId }) => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const timeSlots: string[] = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setDate(value);
      dispatch(setBookingDate(value));
    } else if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(null);
    }
  };

  const confirmBooking = async () => {
    const bookingData = {
      date,
      timeSlot,
      serviceId,
    };

    console.log("Sending booking data:", bookingData);

    if (!date || !timeSlot) {
      setBookingError("Please select both a date and a time slot.");
      return;
    }

    setLoading(true);
    try {
      setBookingError(null);
      const response = await fetch(`${baseURL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const newBooking = await response.json();
      console.log("Booking created successfully:", newBooking);
      dispatch(addBooking(newBooking));
      setBookingConfirmed(true);
      setShowModal(true);
    } catch (error: any) {
      setBookingError(`Error creating booking: ${error.message}`);
      console.error("Error creating booking: ", error.message, error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="booking-container p-4 bg-gray-50 rounded-lg shadow-md max-w-full animate-fadeIn">
      {bookingError && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">
          {bookingError}
        </div>
      )}

      <div className="mb-6">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="w-full transition-transform hover:scale-105"
        />
      </div>

      <div className="time-slot-selection mb-6">
        <h3 className="text-xl font-semibold mb-4">Select a Time Slot</h3>
        <div className="grid grid-cols-3 gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setTimeSlot(slot)}
              className={`time-slot-button p-2 border rounded-md transition transform hover:scale-105 ${
                timeSlot === slot
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              <ClockIcon className="inline h-5 w-5 mr-2" />
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={confirmBooking}
        className="mt-6 w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-600 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
        disabled={!timeSlot || !date || loading}
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Confirm Booking
          </>
        )}
      </button>

      {bookingConfirmed && (
        <div className="mt-6 bg-green-100 p-4 rounded-md transition-transform animate-bounceIn">
          <h3 className="text-xl font-bold mb-2">Booking Summary</h3>
          <p>
            <strong>Date:</strong> {date?.toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {timeSlot}
          </p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform scale-105">
            <h3 className="text-xl font-bold mb-4">Booking Confirmed!</h3>
            <p className="mb-4">
              Your booking has been successfully confirmed.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600 hover:scale-105 transition-transform duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
