import React, { useEffect, useState } from "react";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileForm from "../components/ProfileForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { fetchProfile } from "../redux/slices/profileSlice";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  // Use userSlice for authentication data
  const userState = useAppSelector((state) => state.user);
  const { auth } = userState;
  const { loading, error } = useAppSelector((state) => state.profile);

  useEffect(() => {
    // Ensure auth.user exists and has an id before dispatching fetchProfile
    if (auth && auth.user && auth.user.id) {
      dispatch(fetchProfile(auth.user.id));
    }
  }, [auth, dispatch]);

  // Fetch updated profile data after the profile is edited and saved
  const handleProfileUpdated = () => {
    if (auth && auth.user && auth.user.id) {
      dispatch(fetchProfile(auth.user.id));
    }
    setIsEditing(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 pb-10 animate-fadeIn">
        <Navbar />
        <h1 className="text-4xl text-gray-800 font-bold text-center mt-8 mb-8 animate-bounceIn">
          Profile
        </h1>

        {loading && (
          <p className="text-gray-500 animate-pulse text-center">Loading...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {!loading &&
          !error &&
          (isEditing ? (
            <ProfileForm
              onCancel={() => setIsEditing(false)}
              onSave={handleProfileUpdated}
            />
          ) : (
            <ProfileDisplay onEdit={() => setIsEditing(true)} />
          ))}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
