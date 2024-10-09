import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/profileSlice";
import { RootState } from "../store/store";
import {
  PhotoIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const ProfileForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const profile = useSelector((state: RootState) => state.profile);
  const [services, setServices] = useState(profile.services);
  const [pricing, setPricing] = useState(profile.pricing);
  const [availability, setAvailability] = useState(profile.availability);
  const [location, setLocation] = useState(profile.location || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);
  const [socialLinks, setSocialLinks] = useState({
    facebook: profile.socialLinks?.facebook || "",
    instagram: profile.socialLinks?.instagram || "",
    linkedin: profile.socialLinks?.linkedin || "",
  });
  const dispatch = useDispatch();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handlePortfolioImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setPortfolioImages([...portfolioImages, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        services,
        pricing,
        availability,
        location,
        bio,
        profileImage,
        portfolioImages,
        socialLinks,
      })
    );
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-md animate-fadeIn"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Your Profile</h2>

      {/* Profile Image Upload */}
      <div className="mb-6">
        <label className="block text-lg mb-2 flex items-center">
          <UserCircleIcon className="h-5 w-5 mr-2" />
          Profile Image
        </label>
        <input
          type="file"
          onChange={handleProfileImageChange}
          className="w-full p-3 border rounded-md transition-transform hover:scale-105"
        />
        {profileImage && (
          <div className="mt-4 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-2">Image Preview:</h3>
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border"
            />
          </div>
        )}
      </div>

      {/* Services Offered */}
      <label className="block text-lg mb-2 flex items-center">
        <BriefcaseIcon className="h-5 w-5 mr-2" />
        Services Offered
      </label>
      <input
        type="text"
        value={services}
        onChange={(e) => setServices(e.target.value)}
        placeholder="e.g., Plumbing, Artisan services"
        className="w-full p-3 mb-4 border rounded-md transition-transform hover:scale-105"
        required
      />

      {/* Pricing */}
      <label className="block text-lg mb-2 flex items-center">
        <CurrencyDollarIcon className="h-5 w-5 mr-2" />
        Pricing
      </label>
      <input
        type="text"
        value={pricing}
        onChange={(e) => setPricing(e.target.value)}
        placeholder="e.g., $50/hour"
        className="w-full p-3 mb-4 border rounded-md transition-transform hover:scale-105"
        required
      />

      {/* Availability */}
      <label className="block text-lg mb-2 flex items-center">
        <CalendarIcon className="h-5 w-5 mr-2" />
        Availability
      </label>
      <input
        type="text"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        placeholder="e.g., Monday - Friday, 9 AM - 5 PM"
        className="w-full p-3 mb-4 border rounded-md transition-transform hover:scale-105"
        required
      />

      {/* Location */}
      <label className="block text-lg mb-2 flex items-center">
        <MapPinIcon className="h-5 w-5 mr-2" />
        Location
      </label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="e.g., New York, NY"
        className="w-full p-3 mb-4 border rounded-md transition-transform hover:scale-105"
        required
      />

      {/* Bio */}
      <label className="block text-lg mb-2">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell us more about yourself and your services"
        className="w-full p-3 mb-4 border rounded-md h-32 transition-transform hover:scale-105"
        required
      ></textarea>

      {/* Portfolio Upload */}
      <div className="mb-6">
        <label className="block text-lg mb-2 flex items-center">
          <PhotoIcon className="h-5 w-5 mr-2" />
          Portfolio Images
        </label>
        <input
          type="file"
          multiple
          onChange={handlePortfolioImagesChange}
          className="w-full p-3 border rounded-md transition-transform hover:scale-105"
        />
      </div>

      {/* Social Media Links */}
      <div className="mb-6">
        <label className="block text-lg mb-2">Social Media Links</label>
        <input
          type="text"
          placeholder="Facebook Profile"
          value={socialLinks.facebook}
          onChange={(e) =>
            setSocialLinks({ ...socialLinks, facebook: e.target.value })
          }
          className="w-full p-3 mb-4 border rounded-md transition-transform hover:scale-105"
        />
        <input
          type="text"
          placeholder="Instagram Profile"
          value={socialLinks.instagram}
          onChange={(e) =>
            setSocialLinks({ ...socialLinks, instagram: e.target.value })
          }
          className="w-full p-3 mb-4 border rounded-md transition-transform hover:scale-105"
        />
        <input
          type="text"
          placeholder="LinkedIn Profile"
          value={socialLinks.linkedin}
          onChange={(e) =>
            setSocialLinks({ ...socialLinks, linkedin: e.target.value })
          }
          className="w-full p-3 mb-4 border rounded-md transition-transform hover:scale-105"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-600 transition-transform hover:scale-105"
      >
        Update Profile
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="w-full mt-4 bg-gray-200 p-3 rounded-md hover:bg-gray-300 transition-transform hover:scale-105"
      >
        Cancel
      </button>
    </form>
  );
};

export default ProfileForm;
