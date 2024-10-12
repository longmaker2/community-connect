import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../features/authSlice";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UsersIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("consumer");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const fakeToken = "123456";
    dispatch(loginSuccess({ email, token: fakeToken, userType }));
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md my-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister}>
        {/* First Name */}
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-lg mb-2 flex items-center"
          >
            <UserIcon className="h-5 w-5 mr-2" />
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            placeholder="Enter your first name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-lg mb-2 flex items-center"
          >
            <UserIcon className="h-5 w-5 mr-2" />
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            placeholder="Enter your last name"
            required
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-lg mb-2 flex items-center"
          >
            <UserIcon className="h-5 w-5 mr-2" />
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            placeholder="Enter a unique username"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg mb-2 flex items-center"
          >
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-lg mb-2 flex items-center"
          >
            <LockClosedIcon className="h-5 w-5 mr-2" />
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            placeholder="Enter a secure password"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-lg mb-2 flex items-center"
          >
            <LockClosedIcon className="h-5 w-5 mr-2" />
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            placeholder="Re-enter your password"
            required
          />
        </div>

        {/* Password Error */}
        {passwordError && (
          <p className="text-red-500 text-sm mb-4">{passwordError}</p>
        )}

        {/* User Type */}
        <div className="mb-4">
          <label
            htmlFor="userType"
            className="block text-lg mb-2 flex items-center"
          >
            <UsersIcon className="h-5 w-5 mr-2" />
            User Type
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          >
            <option value="consumer">Consumer</option>
            <option value="business">Business</option>
            <option value="artisan">Artisan</option>
          </select>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-600 hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
        >
          <span>Register</span>
          <CheckIcon className="h-5 w-5" />
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline hover:text-blue-700 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
