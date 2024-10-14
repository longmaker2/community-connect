import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  BellIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
} from "@heroicons/react/24/outline";
import { Spin } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import styles 

type PrivacySettingsKey =
  | "enable2FA"
  | "allowPublicProfile"
  | "emailNotifications"
  | "smsNotifications"
  | "pushNotifications";

const SettingsPage: React.FC = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [privacySettings, setPrivacySettings] = useState({
    enable2FA: false,
    allowPublicProfile: false,
    emailNotifications: false,
    smsNotifications: false,
    pushNotifications: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/user/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { name, email, username } = response.data;
        setUserData({ name, email, password: "", username });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData: { name?: string; password?: string } = {};
      if (userData.name) updateData.name = userData.name;
      if (userData.password) updateData.password = userData.password;

      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/user/auth/update",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Account details updated successfully!");
        setIsEditing(false);
        setUserData({ ...userData, password: "" });
      }
    } catch (error) {
      console.error("Error updating account details", error);
      toast.error("Failed to update account details.");
    }
  };

  const handlePrivacyChange = (setting: PrivacySettingsKey) => {
    setPrivacySettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center mt-8">
          Settings
        </h1>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
          {/* Account Settings Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <form onSubmit={handleAccountSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-2" /> Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition-transform hover:scale-105 ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  required
                  readOnly={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2" /> Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition-transform hover:scale-105 ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  required
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm mb-1 flex items-center">
                  <LockClosedIcon className="h-5 w-5 mr-2" /> Change Password
                </label>
                <input
                  type="password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition-transform hover:scale-105 ${
                    !isEditing ? "bg-gray-200" : ""
                  }`}
                  readOnly={!isEditing}
                />
              </div>

              <button
                className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition-transform hover:scale-105"
                type="button"
                onClick={toggleEditMode}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
              {isEditing && (
                <button
                  className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition-transform hover:scale-105"
                  type="submit"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>

          {/* Privacy and Security Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Privacy and Security</h2>
            <div className="mb-3 flex items-center">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">
                Enable Two-Factor Authentication
              </label>
              <input
                type="checkbox"
                checked={privacySettings.enable2FA}
                onChange={() => handlePrivacyChange("enable2FA")}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="mb-3 flex items-center">
              <UserCircleIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">Allow Public Profile</label>
              <input
                type="checkbox"
                checked={privacySettings.allowPublicProfile}
                onChange={() => handlePrivacyChange("allowPublicProfile")}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>
          </div>

          {/* Notifications Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>

            <div className="mb-3 flex items-center">
              <BellIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">Email Notifications</label>
              <input
                type="checkbox"
                checked={privacySettings.emailNotifications}
                onChange={() => handlePrivacyChange("emailNotifications")}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="mb-3 flex items-center">
              <DevicePhoneMobileIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">SMS Notifications</label>
              <input
                type="checkbox"
                checked={privacySettings.smsNotifications}
                onChange={() => handlePrivacyChange("smsNotifications")}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="mb-3 flex items-center">
              <DeviceTabletIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">Push Notifications</label>
              <input
                type="checkbox"
                checked={privacySettings.pushNotifications}
                onChange={() => handlePrivacyChange("pushNotifications")}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
};

export default SettingsPage;
