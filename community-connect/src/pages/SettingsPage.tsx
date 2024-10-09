import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  BellIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
} from "@heroicons/react/24/outline";
import Footer from "../components/Footer";

const SettingsPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [enable2FA, setEnable2FA] = useState(false);
  const [allowPublicProfile, setAllowPublicProfile] = useState(true);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account details updated!");
  };

  const handlePrivacySave = () => {
    alert("Privacy settings updated!");
  };

  const handleNotificationsSave = () => {
    alert("Notification settings updated!");
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
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition-transform hover:scale-105"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition-transform hover:scale-105"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1 flex items-center">
                  <LockClosedIcon className="h-5 w-5 mr-2" />
                  Change Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition-transform hover:scale-105"
                />
              </div>

              <button className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition-transform hover:scale-105">
                Save Changes
              </button>
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
                checked={enable2FA}
                onChange={() => setEnable2FA(!enable2FA)}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="mb-3 flex items-center">
              <UserCircleIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">Allow Public Profile</label>
              <input
                type="checkbox"
                checked={allowPublicProfile}
                onChange={() => setAllowPublicProfile(!allowPublicProfile)}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <button
              onClick={handlePrivacySave}
              className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 transition-transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>

          {/* Notification Settings Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>

            <div className="mb-3 flex items-center">
              <BellIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">Email Notifications</label>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="mb-3 flex items-center">
              <DevicePhoneMobileIcon className="h-5 w-5 mr-2" />{" "}
              {/* Corrected */}
              <label className="block text-sm mb-2">SMS Notifications</label>
              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={() => setSmsNotifications(!smsNotifications)}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <div className="mb-3 flex items-center">
              <DeviceTabletIcon className="h-5 w-5 mr-2" />
              <label className="block text-sm mb-2">Push Notifications</label>
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
                className="ml-auto h-4 w-4 text-blue-600 rounded"
              />
            </div>

            <button
              onClick={handleNotificationsSave}
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
