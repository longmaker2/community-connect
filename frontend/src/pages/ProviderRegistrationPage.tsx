import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  UserIcon,
  BriefcaseIcon,
  ClipboardIcon,
  CurrencyDollarIcon,
  ClockIcon,
  MapPinIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  LinkIcon,
  TagIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const ProviderRegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    serviceTitle: "",
    imageUrl: "",
    description: "",
    pricing: "",
    availability: "",
    location: "",
    bio: "",
    serviceCategory: "",
    email: "",
    phone: "",
    website: "",
    socialLinks: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file); // Read the file as a data URL to display it
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration Successful! You will be contacted soon.");
    navigate("/"); // Redirect to home page after submission
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-6 md:px-24 lg:px-40 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 animate-fadeIn">
          Service Provider Registration
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md animate-slideUp"
        >
          {/* Business Name */}
          <div className="mb-4 animate-fadeIn delay-100">
            <label className="block text-gray-700 font-semibold mb-2">
              Business Name
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <UserIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your business name"
                required
              />
            </div>
          </div>

          {/* Service Title */}
          <div className="mb-4 animate-fadeIn delay-200">
            <label className="block text-gray-700 font-semibold mb-2">
              Service Title
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <BriefcaseIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="text"
                name="serviceTitle"
                value={formData.serviceTitle}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter the title of the service you provide"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4 animate-fadeIn delay-300">
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Service Image
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <PhotoIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                required
              />
            </div>
            {imagePreview && (
              <div className="mt-4 animate-fadeIn">
                <img
                  src={imagePreview}
                  alt="Service Preview"
                  className="w-full h-48 object-cover rounded-md transition-transform hover:scale-105"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4 animate-fadeIn delay-400">
            <label className="block text-gray-700 font-semibold mb-2">
              Service Description
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <ClipboardIcon className="h-6 w-6 text-gray-700" />
              </span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Describe the services you offer"
                rows={4}
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-4 animate-fadeIn delay-500">
            <label className="block text-gray-700 font-semibold mb-2">
              Pricing
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <CurrencyDollarIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="number"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your pricing information"
                required
              />
            </div>
          </div>

          {/* Availability */}
          <div className="mb-4 animate-fadeIn delay-600">
            <label className="block text-gray-700 font-semibold mb-2">
              Availability
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <ClockIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your availability (e.g., weekdays, weekends)"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-4 animate-fadeIn delay-700">
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <MapPinIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your service location (e.g., city, region)"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4 animate-fadeIn delay-800">
            <label className="block text-gray-700 font-semibold mb-2">
              About You / Bio
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <InformationCircleIcon className="h-6 w-6 text-gray-700" />
              </span>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Provide some details about yourself or your business"
                rows={4}
                required
              />
            </div>
          </div>

          {/* Service Category */}
          <div className="mb-4 animate-fadeIn delay-900">
            <label className="block text-gray-700 font-semibold mb-2">
              Service Category
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <TagIcon className="h-6 w-6 text-gray-700" />
              </span>
              <select
                name="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                required
              >
                <option value="">Select a category</option>
                <option value="Home Services">Home Services</option>
                <option value="Artisans & Crafts">Artisans & Crafts</option>
                <option value="Health & Wellness">Health & Wellness</option>
              </select>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4 animate-fadeIn delay-1000">
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <EnvelopeIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-4 animate-fadeIn delay-1100">
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <PhoneIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          {/* Website URL */}
          <div className="mb-4 animate-fadeIn delay-1200">
            <label className="block text-gray-700 font-semibold mb-2">
              Website
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <GlobeAltIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your website URL (optional)"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mb-4 animate-fadeIn delay-1300">
            <label className="block text-gray-700 font-semibold mb-2">
              Social Media Links
            </label>
            <div className="relative">
              <span className="absolute top-2.5 left-3">
                <LinkIcon className="h-6 w-6 text-gray-700" />
              </span>
              <input
                type="text"
                name="socialLinks"
                value={formData.socialLinks}
                onChange={handleChange}
                className="w-full pl-12 px-3 py-2 border rounded-md focus:outline-none focus:border-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
                placeholder="Enter your social media links (optional)"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-transform transform hover:scale-110 duration-300"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProviderRegistrationPage;
