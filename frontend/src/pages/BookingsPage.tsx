import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { baseURL } from "../utils/baseURL";
import { Spin } from "antd";

interface Booking {
  _id: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  status: string;
}

interface Service {
  _id: string;
  businessName: string;
  description: string;
}

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Record<string, Service>>({});

  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${baseURL}/bookings`);

        console.log("Bookings Response:", response.data); 
        const fetchedBookings: Booking[] = response.data.bookings; 
        setBookings(fetchedBookings);

        
        const uniqueServiceIds = Array.from(new Set(fetchedBookings.map((booking) => booking.serviceId)));

        
        const servicePromises = uniqueServiceIds.map((serviceId) =>
          axios.get(`${baseURL}/service/services/provider/${serviceId}`)
        );

        const serviceResponses = await Promise.all(servicePromises);
        const serviceMap: Record<string, Service> = {};

        serviceResponses.forEach((serviceRes) => {
          if (serviceRes.data && serviceRes.data.service) {
            const service: Service = serviceRes.data.service;
            serviceMap[service._id] = service;
          } else {
            console.warn(`Service not found for ID: ${serviceRes.config.url}`);
          }
        });

        setServices(serviceMap);
      } catch (error) {
        console.error("Error fetching bookings or services", error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error message:", error.message);
          if (error.response) {
            console.error("Response data:", error.response.data);
          }
        } else {
          console.error("Unexpected error:", error);
        }
        setError("Error fetching bookings or services");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-6 md:px-24 lg:px-40 animate-fadeIn">
        <h1 className="text-3xl font-semibold mb-6 animate-slideDown">My Bookings</h1>

        {loading ? (
            <div className="flex justify-center items-center h-60 text-[#1F2937]">
            <Spin size="small" />
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600">You have no bookings.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {services[booking.serviceId]?.businessName || "Service not found"}
                    </h2>
                    <p className="text-gray-600">
                      Description: {services[booking.serviceId]?.description || "No description available"}
                    </p>
                    <p className="text-gray-600">
                      Date: {formatDate(booking.date)} at {booking.timeSlot}
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
