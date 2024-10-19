import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ChatPopup from "../components/Chatting";
import { StarIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Booking from "../components/Booking";
import axios from "axios";
import { Spin } from "antd";
import { useAppSelector } from "../redux/store/store";
import { baseURL } from "../utils/baseURL";

interface Review {
  name: string;
  profilePicture: string;
  review: string;
  rating: number;
  createdAt: string;
}

const generateInitialsProfile = (name: string) => {
  const initialsText = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const canvas = document.createElement("canvas");
  canvas.width = 40;
  canvas.height = 40;
  const context = canvas.getContext("2d");

  if (context) {
    context.fillStyle = "#555";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "20px Arial";
    context.fillStyle = "#FFF";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(initialsText, canvas.width / 2, canvas.height / 2);
  }

  return canvas.toDataURL();
};

const BookingPage: React.FC = () => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const { serviceId } = useParams<{ serviceId: string }>();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Use baseURL instead of hardcoded localhost
        const response = await axios.get(
          `${baseURL}/reviews/service/${serviceId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [serviceId]);

  const { auth } = useAppSelector((state) => state.user);
  const loginUser = auth?.user;

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setProfilePicture(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = async () => {
    const newReview = {
      name,
      profilePicture,
      review,
      rating,
      serviceId,
    };

    try {
      const response = await axios.post(`${baseURL}/reviews`, newReview);
      setReviews([response.data, ...reviews]);
      setReview("");
      setRating(0);
      setProfilePicture("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const bookingServiceId = serviceId || "";

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-10 px-6 md:px-24 lg:px-40 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-gray-50 p-6 rounded-lg shadow-lg animate-slideInLeft">
            <img
              src={state?.image}
              alt={state?.name}
              className="w-full h-40 object-cover rounded-lg mb-4 transition-transform hover:scale-105 duration-300"
            />
            <h1 className="text-3xl font-semibold mb-2 animate-slideDown">
              {state?.businessName}
            </h1>
            <p className="text-gray-600 mb-4 animate-fadeIn">
              {state?.description}
            </p>
            <div className="flex items-center mb-4 animate-bounceIn">
              <StarIcon className="h-5 w-5 text-yellow-500" />
              <span className="ml-2 text-gray-600">{state?.rating} / 5.0</span>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Submit a Review</h3>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border rounded-md mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                className="w-full p-2 border rounded-md mb-2"
              />
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full p-2 border rounded-md mb-2"
              >
                <option value={0}>Rate the service</option>
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
              <span>
                <p className="py-3 font-semibold">
                  Add your profile pic (optional)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="w-full p-2 border rounded-md mb-2"
                />
              </span>
              <button
                onClick={handleSubmitReview}
                className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-transform transform hover:scale-110 duration-300"
              >
                Submit Review
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              {loading ? (
                <Spin size="small" />
              ) : reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  {reviews.map((r, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4 transition-transform hover:scale-105 duration-300"
                    >
                      <img
                        src={
                          r.profilePicture || generateInitialsProfile(r.name)
                        }
                        alt={r.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-lg font-semibold">{r.name}</h4>
                          <span className="ml-2 text-gray-500 text-sm">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          {Array(r.rating)
                            .fill(0)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 text-yellow-500"
                              />
                            ))}
                        </div>
                        <p className="text-gray-700">{r.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="sticky top-0 self-start animate-slideInRight">
            <Booking serviceId={bookingServiceId} />
          </div>
        </div>
      </div>

      {loginUser && loginUser.userType === "consumer" && (
        <ChatPopup
          userId={loginUser.id}
          otherUserId={state.provider}
          isBusinessUser={false}
        />
      )}

      <Footer />
    </>
  );
};

export default BookingPage;
