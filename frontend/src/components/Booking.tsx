import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { setBookingDate } from "../features/bookingSlice";
import {
  ClockIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Booking: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [serviceProvider, setServiceProvider] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const timeSlots = [
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
  const serviceProviders = [
    "John's Plumbing",
    "Art by Sarah",
    "Wellness Center",
  ];
  const serviceTypes = ["Plumbing", "Artisan Services", "Health Consultation"];

  // Handle date change from Calendar
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setDate(value);
      dispatch(setBookingDate(value));
    } else {
      setDate(null);
    }
  };

  const confirmBooking = () => {
    setBookingConfirmed(true);
    setShowModal(true); // Trigger the modal when booking is confirmed
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal but keep the summary visible
  };

  return (
    <div className="booking-container p-4 bg-gray-50 rounded-lg shadow-md max-w-full animate-fadeIn">
      {/* Select Service Provider */}
      <div className="mb-6">
        <label
          htmlFor="serviceProvider"
          className="block text-lg font-semibold mb-2 flex items-center "
        >
          <UserCircleIcon className="h-5 w-5 mr-2" /> Select Service Provider
        </label>
        <select
          id="serviceProvider"
          className="w-full p-3 border rounded-md transition-transform hover:scale-105"
          onChange={(e) => setServiceProvider(e.target.value)}
          value={serviceProvider || ""}
        >
          <option value="">Select a provider...</option>
          {serviceProviders.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </div>

      {/* Select Service Type */}
      <div className="mb-6">
        <label
          htmlFor="serviceType"
          className="block text-lg font-semibold mb-2 flex items-center"
        >
          <BriefcaseIcon className="h-5 w-5 mr-2" /> Select Service Type
        </label>
        <select
          id="serviceType"
          className="w-full p-3 border rounded-md transition-transform hover:scale-105"
          onChange={(e) => setServiceType(e.target.value)}
          value={serviceType || ""}
        >
          <option value="">Select a service...</option>
          {serviceTypes.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar Section */}
      <div className="mb-6">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="w-full transition-transform hover:scale-105"
        />
      </div>

      {/* Time Slot Selection */}
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

      {/* Confirm Button */}
      <button
        onClick={confirmBooking}
        className="mt-6 w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-600 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
        disabled={!timeSlot || !serviceProvider || !serviceType}
      >
        <CheckCircleIcon className="h-5 w-5 mr-2" />
        Confirm Booking
      </button>

      {/* Booking Summary (Always visible after confirmation) */}
      {bookingConfirmed && (
        <div className="mt-6 bg-green-100 p-4 rounded-md transition-transform animate-bounceIn">
          <h3 className="text-xl font-bold mb-2">Booking Summary</h3>
          <p>
            <strong>Service Provider:</strong> {serviceProvider}
          </p>
          <p>
            <strong>Service Type:</strong> {serviceType}
          </p>
          <p>
            <strong>Date:</strong> {date?.toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {timeSlot}
          </p>
        </div>
      )}

      {/* Popup Modal */}
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
