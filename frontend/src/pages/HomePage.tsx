import React, { useEffect, useState } from "react";
import { ReactTyped as Typed } from "react-typed";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  BriefcaseIcon,
  StarIcon,
  ArrowRightIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getServices, Service } from "../redux/slices/servicesSlice";
import { baseURL } from "../utils/baseURL";

const HomePage: React.FC = () => {
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [servicesWithAvatars, setServicesWithAvatars] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input
  const [selectedType, setSelectedType] = useState(""); // State for service type
  const [location, setLocation] = useState(""); // State for location
  const [availability, setAvailability] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.service);

  useEffect(() => {
    async function fetchServices() {
      const response = await dispatch(getServices());
      if (getServices.fulfilled.match(response)) {
        setAllServices(response.payload);
      }
    }
    fetchServices();
  }, [dispatch]);
  useEffect(() => {
    async function generateAvatars() {
      const servicesWithAvatars = await Promise.all(
        allServices.map(async (service) => {
          const [avatarResponse, reviewsResponse] = await Promise.all([
            fetch(
              `https://avatar.iran.liara.run/public/boy?username=${service.businessName}`
            ),
            fetch(`${baseURL}/api/reviews/service/${service._id}`),
          ]);
          const reviews = await reviewsResponse.json();
          const ratingValue =
            reviews?.length > 0
              ? (
                  reviews.reduce(
                    (acc: number, review: any) => acc + review.rating,
                    0
                  ) / reviews.length
                ).toFixed(1)
              : 0;

          const avatarUrl = avatarResponse.url;
          return {
            ...service,
            image: avatarUrl,
            rating: ratingValue,
            isFeatured: Math.random() > 0.5,
          };
        })
      );
      setServicesWithAvatars(servicesWithAvatars);
    }

    if (allServices.length > 0) {
      generateAvatars();
    }
  }, [allServices]);

  //console.log(servicesWithAvatars)
  const filterServices = () => {
    return servicesWithAvatars.filter((service) => {
      const matchesType = selectedType ? service.type === selectedType : true;
      const matchesLocation = location
        ? service.location.includes(location)
        : true;
      const matchesAvailability = availability
        ? service.availability.includes(availability)
        : true;
      const matchesSearchTerm = service.businessName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        matchesType &&
        matchesLocation &&
        matchesAvailability &&
        matchesSearchTerm
      );
    });
  };

  const renderStars = (rating: number) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <StarIcon key={index} className="h-5 w-5 text-yellow-500" />
        ))}
        {hasHalfStar && (
          <StarIcon
            className="h-5 w-5 text-yellow-500"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        )}
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
          (_, index) => (
            <StarIcon
              key={fullStars + index}
              className="h-5 w-5 text-gray-300"
            />
          )
        )}
        <span className="ml-1 text-gray-600">{rating.toFixed(1)} / 5.0</span>
      </div>
    );
  };
  return (
    <>
      <Navbar />

      <section className="text-center py-20 px-6 bg-gray-100 animate-fadeIn">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 animate-slideDown">
          <Typed
            strings={["Welcome to Community Connect"]}
            typeSpeed={80}
            backDelay={3000}
            backSpeed={50}
            loop={true}
          />
        </h1>
        <p className="text-xl text-gray-600 mb-8 animate-slideDown delay-100">
          Find local businesses and services near you
        </p>
        <div className="md:flex flex-wrap md:pt-0 pt-6 justify-center mt-6">
          <input
            type="text"
            placeholder="Search for services..."
            className="p-2 w-64 text-lg rounded-l-md border border-gray-300 focus:border-gray-800 focus:outline-none transition-transform transform hover:scale-105 duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <input
            type="text"
            placeholder="Service Type..."
            className="p-2 w-64 text-lg rounded-l-md border border-gray-300 focus:border-gray-800 focus:outline-none transition-transform transform hover:scale-105 duration-300"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)} // Update selected type
          />
          <input
            type="text"
            placeholder="Location..."
            className="p-2 w-64 text-lg rounded-l-md border border-gray-300 focus:border-gray-800 focus:outline-none transition-transform transform hover:scale-105 duration-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // Update location
          />
          <input
            type="text"
            placeholder="Availability..."
            className="p-2 w-64 text-lg rounded-l-md border border-gray-300 focus:border-gray-800 focus:outline-none transition-transform transform hover:scale-105 duration-300"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)} // Update availability
          />
          <button className="bg-gray-800 text-white hover:bg-gray-600 p-2 rounded-r-md transition-transform transform hover:scale-105 duration-300">
            <MagnifyingGlassIcon className="h-5 w-5 inline mr-2" />
            Search
          </button>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-100 animate-fadeIn">
        <h2 className="text-4xl font-bold mb-8 text-center">Our Services</h2>
        {loading ? (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            {filterServices() ? (
              filterServices().map((service) => (
                <div
                  key={service._id}
                  className="p-4 bg-blue-50 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mb-1">
                    {service.businessName}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center my-2">
                    {renderStars(parseFloat(service.rating))}
                  </div>
                  {service?.isFeatured && (
                    <span className="text-white bg-green-500 px-2 py-1 mx-1 rounded-md text-xs">
                      Featured
                    </span>
                  )}

                  <Link
                    to={`/booking/${service._id}`}
                    state={service}
                    className="inline-block mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-transform transform hover:scale-105 duration-300"
                  >
                    Book Now
                    <ArrowRightIcon className="h-5 w-5 inline ml-2" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <InboxIcon className="h-16 w-16 text-black mb-4 text-base " />
                <p className="text-base text-gray-800">No available service.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Service Categories Section */}
      <section className="py-20 px-6 bg-white text-center animate-fadeIn">
        <h2 className="text-4xl font-bold mb-8">Browse Service Categories</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-blue-50 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <BriefcaseIcon className="h-8 w-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Home Services</h3>
            <p className="text-gray-600">
              Find electricians, plumbers, and other home service providers.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <BriefcaseIcon className="h-8 w-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Artisans & Crafts</h3>
            <p className="text-gray-600">
              Hire local artisans for handmade crafts, furniture, and more.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
            <BriefcaseIcon className="h-8 w-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Health & Wellness</h3>
            <p className="text-gray-600">
              Connect with health professionals in your area for consultations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 text-center bg-gray-800 text-white animate-fadeIn">
        <h2 className="text-4xl font-bold mb-6">How It Works</h2>
        <ul className="text-lg space-y-4 max-w-3xl mx-auto">
          <li className="transform hover:scale-105 transition-transform duration-300">
            <MagnifyingGlassIcon className="h-6 w-6 inline mr-2" />
            Step 1: Search for a local service
          </li>
          <li className="transform hover:scale-105 transition-transform duration-300">
            <CalendarDaysIcon className="h-6 w-6 inline mr-2" />
            Step 2: Book an appointment
          </li>
          <li className="transform hover:scale-105 transition-transform duration-300">
            <ChatBubbleLeftRightIcon className="h-6 w-6 inline mr-2" />
            Step 3: Chat with the provider
          </li>
          <li className="transform hover:scale-105 transition-transform duration-300">
            <UserCircleIcon className="h-6 w-6 inline mr-2" />
            Step 4: Rate the service
          </li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-100 text-center animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 animate-bounceIn">
          What Our Users Say
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <UserCircleIcon className="h-6 w-6 inline mr-2 text-gray-700" />
            <p className="text-gray-700">
              "Amazing platform! I found the best local electrician through
              Community Connect."
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-800">
              - Jane Doe
            </p>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <UserCircleIcon className="h-6 w-6 inline mr-2 text-gray-700" />
            <p className="text-gray-700">
              "The booking system is so easy to use, and the chat feature was a
              lifesaver."
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-800">
              - John Smith
            </p>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300">
            <UserCircleIcon className="h-6 w-6 inline mr-2 text-gray-700" />
            <p className="text-gray-700">
              "This platform made it so easy to find and hire a local plumber!"
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-800">
              - Sarah Lee
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section for Businesses */}
      <section className="py-16 bg-gray-100 text-black text-center animate-bounceIn">
        <h2 className="text-4xl font-bold mb-4">
          Are You a Business or Service Provider?
        </h2>
        <p className="text-lg mb-8">
          Register your business with Community Connect to reach local customers
          and grow your business.
        </p>
        <button
          onClick={() => navigate("/provider-registration")}
          className="bg-gray-800 text-white hover:bg-gray-600 py-1 px-10 rounded-md text-lg transition-transform transform hover:scale-110 duration-300"
        >
          Register Now
        </button>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 my-10 text-center animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="max-w-7xl mx-10 text-center space-y-6">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-2">
              How does Community Connect work?
            </h3>
            <p className="text-gray-600">
              You can search for local services, book appointments, and chat
              with service providers directly on the platform.
            </p>
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-2">
              Is there a fee to use the platform?
            </h3>
            <p className="text-gray-600">
              No, it is free for consumers to use. Service providers may have
              subscription options to feature their services.
            </p>
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-2">
              How do I join as a service provider?
            </h3>
            <p className="text-gray-600">
              Click on the "Join Now" button and complete the registration form
              to create your business profile.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
