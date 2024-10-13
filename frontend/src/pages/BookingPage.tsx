import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ChatPopup from "../components/Chatting";
import {
  StarIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Booking from "../components/Booking";

// Sample service data (this will be fetched dynamically)
const services = [
  {
    id: 1,
    name: "John's Plumbing",
    description:
      "Expert plumbing services for residential and commercial needs.",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Art by Sarah",
    description: "Handcrafted art and custom designs for your home or office.",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    rating: 4.5,
    isFeatured: false,
  },
  {
    id: 3,
    name: "Wellness Center",
    description: "Holistic health and wellness services for a balanced life.",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    rating: 4.7,
    isFeatured: true,
  },
  {
    id: 4,
    name: "John's Plumbing",
    description:
      "Expert plumbing services for residential and commercial needs.",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: 5,
    name: "Art by Sarah",
    description: "Handcrafted art and custom designs for your home or office.",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    rating: 4.5,
    isFeatured: false,
  },
  {
    id: 6,
    name: "Wellness Center",
    description: "Holistic health and wellness services for a balanced life.",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    rating: 4.7,
    isFeatured: true,
  },
  {
    id: 7,
    name: "John's Plumbing",
    description:
      "Expert plumbing services for residential and commercial needs.",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: 8,
    name: "Art by Sarah",
    description: "Handcrafted art and custom designs for your home or office.",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    rating: 4.5,
    isFeatured: false,
  },
];

interface Review {
  name: string;
  profilePicture: string;
  review: string;
  rating: number;
  date: Date;
}

const BookingPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find((s) => s.id === parseInt(serviceId!));

  const [name, setName] = useState("");
  const [profilePicture] = useState("https://via.placeholder.com/40"); // Placeholder profile picture
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([
    // Dummy reviews
    {
      name: "Alice Johnson",
      profilePicture: "https://via.placeholder.com/40",
      review:
        "Great service! The plumber was on time and fixed the issue quickly.",
      rating: 5,
      date: new Date("2024-01-01"),
    },
    {
      name: "Michael Smith",
      profilePicture: "https://via.placeholder.com/40",
      review: "Good experience, but the price was a bit high for me.",
      rating: 4,
      date: new Date("2024-02-15"),
    },
    {
      name: "Jane Doe",
      profilePicture: "https://via.placeholder.com/40",
      review: "The service was okay, but communication could be better.",
      rating: 3,
      date: new Date("2024-03-10"),
    },
    {
      name: "Alice Johnson",
      profilePicture: "https://via.placeholder.com/40",
      review:
        "Great service! The plumber was on time and fixed the issue quickly.",
      rating: 5,
      date: new Date("2024-01-01"),
    },
    {
      name: "Michael Smith",
      profilePicture: "https://via.placeholder.com/40",
      review: "Good experience, but the price was a bit high for me.",
      rating: 4,
      date: new Date("2024-02-15"),
    },
    {
      name: "Jane Doe",
      profilePicture: "https://via.placeholder.com/40",
      review: "The service was okay, but communication could be better.",
      rating: 3,
      date: new Date("2024-03-10"),
    },
    {
      name: "Alice Johnson",
      profilePicture: "https://via.placeholder.com/40",
      review:
        "Great service! The plumber was on time and fixed the issue quickly.",
      rating: 5,
      date: new Date("2024-01-01"),
    },
    {
      name: "Michael Smith",
      profilePicture: "https://via.placeholder.com/40",
      review: "Good experience, but the price was a bit high for me.",
      rating: 4,
      date: new Date("2024-02-15"),
    },
    {
      name: "Jane Doe",
      profilePicture: "https://via.placeholder.com/40",
      review: "The service was okay, but communication could be better.",
      rating: 3,
      date: new Date("2024-03-10"),
    },
    {
      name: "Alice Johnson",
      profilePicture: "https://via.placeholder.com/40",
      review:
        "Great service! The plumber was on time and fixed the issue quickly.",
      rating: 5,
      date: new Date("2024-01-01"),
    },
    {
      name: "Michael Smith",
      profilePicture: "https://via.placeholder.com/40",
      review: "Good experience, but the price was a bit high for me.",
      rating: 4,
      date: new Date("2024-02-15"),
    },
    {
      name: "Jane Doe",
      profilePicture: "https://via.placeholder.com/40",
      review: "The service was okay, but communication could be better.",
      rating: 3,
      date: new Date("2024-03-10"),
    },
  ]);

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "provider", text: "Hello! How can I help you today?" },
    { sender: "user", text: "I need help with a plumbing issue at my home." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  if (!service) {
    return <div>Service not found</div>;
  }

  const handleChat = () => {
    setShowChat(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "user", text: newMessage }]);
      setNewMessage("");
      // Simulate provider response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "provider", text: "I can assist with that." },
        ]);
      }, 1000);
    }
  };

  const handleSubmitReview = () => {
    const newReview: Review = {
      name,
      profilePicture,
      review,
      rating,
      date: new Date(),
    };
    setReviews([newReview, ...reviews]);
    setReview("");
    setRating(0);
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-10 px-6 md:px-24 lg:px-40 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left side: Service Details (2/3 of the width) */}
          <div className="col-span-2 bg-gray-50 p-6 rounded-lg shadow-lg animate-slideInLeft">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover rounded-lg mb-4 transition-transform hover:scale-105 duration-300"
            />
            <h1 className="text-3xl font-semibold mb-2 animate-slideDown">
              {service.name}
            </h1>
            <p className="text-gray-600 mb-4 animate-fadeIn">
              {service.description}
            </p>
            <div className="flex items-center mb-4 animate-bounceIn">
              <StarIcon className="h-5 w-5 text-yellow-500" />
              <span className="ml-2 text-gray-600">{service.rating} / 5.0</span>
            </div>
            <button
              onClick={handleChat}
              className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-transform transform hover:scale-110 duration-300 mb-4 animate-bounceIn"
            >
              Chat with Provider{" "}
              <ChatBubbleLeftRightIcon className="inline h-5 w-5 ml-2" />
            </button>
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
              <button
                onClick={handleSubmitReview}
                className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-transform transform hover:scale-110 duration-300"
              >
                Submit Review
              </button>
            </div>

            {/* Display the reviews */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  {reviews.map((r, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4 transition-transform hover:scale-105 duration-300"
                    >
                      <img
                        src={r.profilePicture}
                        alt={r.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-lg font-semibold">{r.name}</h4>
                          <span className="ml-2 text-gray-500 text-sm">
                            {r.date.toLocaleDateString()}
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

          {/* Right side: Booking Form (1/3 of the width, sticky) */}
          <div className="sticky top-0 self-start animate-slideInRight">
            <Booking />
          </div>
        </div>
      </div>
              <ChatPopup/>
      {/* Chat Modal */}
      {/* {showChat && (
        // <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        //   <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        //     <div className="flex justify-between items-center mb-4">
        //       <h3 className="text-lg font-semibold">
        //         Chat with {service?.name}
        //       </h3>
        //       <button onClick={() => setShowChat(false)}>
        //         <XMarkIcon className="h-6 w-6 text-gray-600" />
        //       </button>
        //     </div>

        //     <div className="h-64 overflow-y-scroll mb-4">
        //       {messages.map((msg, index) => (
        //         <div
        //           key={index}
        //           className={`mb-2 flex ${
        //             msg.sender === "user" ? "justify-end" : "justify-start"
        //           }`}
        //         >
        //           <span
        //             className={`inline-block p-2 rounded-lg ${
        //               msg.sender === "user"
        //                 ? "bg-blue-500 text-white"
        //                 : "bg-gray-200 text-gray-700"
        //             }`}
        //           >
        //             {msg.text}
        //           </span>
        //         </div>
        //       ))}
        //     </div>

        //     <div className="flex">
        //       <input
        //         type="text"
        //         value={newMessage}
        //         onChange={(e) => setNewMessage(e.target.value)}
        //         placeholder="Type a message"
        //         className="flex-1 p-2 border rounded-l-md"
        //       />
        //       <button
        //         onClick={handleSendMessage}
        //         className="bg-blue-600 text-white p-2 rounded-r-md"
        //       >
        //         Send
        //       </button>
        //     </div>
        //   </div>
        // </div>
        
      )} */}
      

      <Footer />
    </>
  );
};

export default BookingPage;
