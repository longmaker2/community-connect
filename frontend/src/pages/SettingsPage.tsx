import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setUserData,
  toggleEnable2FA,
  toggleAllowPublicProfile,
  toggleEmailNotifications,
  toggleSMSNotifications,
  togglePushNotifications,
} from "../features/settingsSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  BellIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
} from "@heroicons/react/24/outline";

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: any) => state.settings);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile"
        );
        const { name, email } = response.data;

        dispatch(setUserData({ name, email }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/auth/update",
        {
          name: settings.name,
          email: settings.email,
          password: settings.password,
        }
      );

      if (response.status === 200) {
        alert("Account details updated successfully!");
      }
    } catch (error) {
      console.error("Error updating account details", error);
      alert("Failed to update account details.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 pb-8">
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
                  value={settings.name}
                  onChange={(e) =>
                    dispatch(setUserData({ name: e.target.value }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition-transform hover:scale-105"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2" /> Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    dispatch(setUserData({ email: e.target.value }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition-transform hover:scale-105"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 flex items-center">
                  <LockClosedIcon className="h-5 w-5 mr-2" /> Change Password
                </label>
                <input
                  type="password"
                  value={settings.password}
                  onChange={(e) =>
                    dispatch(setUserData({ password: e.target.value }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition-transform hover:scale-105"
                />
              </div>

              <button
                className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition-transform hover:scale-105"
                type="submit"
              >
                Save Changes
              </button>
            </form>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Privacy and Security</h2>
            <div className="mb-3 flex items-center">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">
                Enable Two-Factor Authentication
              </label>
              <input
                type="checkbox"
                checked={settings.enable2FA}
                onChange={() => dispatch(toggleEnable2FA())}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="mb-3 flex items-center">
              <UserCircleIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">Allow Public Profile</label>
              <input
                type="checkbox"
                checked={settings.allowPublicProfile}
                onChange={() => dispatch(toggleAllowPublicProfile())}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <button
              onClick={() => alert("Privacy settings updated!")}
              className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition-transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>

            <div className="mb-3 flex items-center">
              <BellIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => dispatch(toggleEmailNotifications())}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="mb-3 flex items-center">
              <DevicePhoneMobileIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">SMS Notifications</label>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={() => dispatch(toggleSMSNotifications())}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="mb-3 flex items-center">
              <DeviceTabletIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">Push Notifications</label>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => dispatch(togglePushNotifications())}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <button
              onClick={() => alert("Notification settings updated!")}
              className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition-transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SettingsPage;
