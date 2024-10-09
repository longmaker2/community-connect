import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Booking {
  id: number;
  serviceName: string;
  providerName: string;
  date: string;
  time: string;
  status: string;
}

const BookingsPage: React.FC = () => {
  // Dummy booking data
  const bookings: Booking[] = [
    {
      id: 1,
      serviceName: "Plumbing Service",
      providerName: "John's Plumbing",
      date: "2024-05-20",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      serviceName: "Yoga Session",
      providerName: "Wellness Center",
      date: "2024-06-15",
      time: "2:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      serviceName: "Art Workshop",
      providerName: "Art by Sarah",
      date: "2024-07-10",
      time: "5:00 PM",
      status: "Cancelled",
    },
    {
      id: 1,
      serviceName: "Plumbing Service",
      providerName: "John's Plumbing",
      date: "2024-05-20",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      serviceName: "Yoga Session",
      providerName: "Wellness Center",
      date: "2024-06-15",
      time: "2:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      serviceName: "Art Workshop",
      providerName: "Art by Sarah",
      date: "2024-07-10",
      time: "5:00 PM",
      status: "Cancelled",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-6 md:px-24 lg:px-40 animate-fadeIn">
        <h1 className="text-3xl font-semibold mb-6 animate-slideDown">
          My Bookings
        </h1>
        {bookings.length === 0 ? (
          <p className="text-gray-600">You have no bookings.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {booking.serviceName}
                    </h2>
                    <p className="text-gray-600">
                      Provider: {booking.providerName}
                    </p>
                    <p className="text-gray-600">
                      Date: {booking.date} at {booking.time}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookingsPage;
