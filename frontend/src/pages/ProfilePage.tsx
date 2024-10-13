import React, { useState } from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileForm from "../components/ProfileForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-100 pb-10 animate-fadeIn">
        <Navbar />
        <h1 className="text-4xl text-gray-800 font-bold text-center mt-8 mb-8 animate-bounceIn">
          Profile
        </h1>

        {isEditing ? (
          <ProfileForm onCancel={() => setIsEditing(false)} />
        ) : (
          <ProfileDisplay onEdit={() => setIsEditing(true)} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
