import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProfileDisplay: React.FC<{ onEdit: () => void }> = ({ onEdit }) => {
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <div className="profile-display max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Profile Image */}
      <div className="mb-6 text-center">
        {profile.profileImage ? (
          <img
            src={URL.createObjectURL(profile.profileImage)}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto border mb-4"
          />
        ) : (
          <p className="text-lg">No profile image uploaded</p>
        )}
      </div>

      {/* Profile Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Profile Information</h3>
        <p>
          <strong>Services:</strong> {profile.services}
        </p>
        <p>
          <strong>Pricing:</strong> {profile.pricing}
        </p>
        <p>
          <strong>Availability:</strong> {profile.availability}
        </p>
        <p>
          <strong>Location:</strong> {profile.location}
        </p>
        <p>
          <strong>Bio:</strong> {profile.bio}
        </p>
      </div>

      {/* Social Media Links */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Social Media</h3>
        {profile.socialLinks?.facebook && (
          <p>
            <strong>Facebook:</strong> {profile.socialLinks.facebook}
          </p>
        )}
        {profile.socialLinks?.instagram && (
          <p>
            <strong>Instagram:</strong> {profile.socialLinks.instagram}
          </p>
        )}
        {profile.socialLinks?.linkedin && (
          <p>
            <strong>LinkedIn:</strong> {profile.socialLinks.linkedin}
          </p>
        )}
      </div>

      {/* Portfolio */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Portfolio</h3>
        <div className="grid grid-cols-2 gap-4">
          {profile.portfolioImages?.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      <button
        onClick={onEdit}
        className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-600 transition-transform hover:scale-105"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileDisplay;
