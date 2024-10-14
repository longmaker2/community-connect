import {
  CheckIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  UsersIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/store/store";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  userType: string;
  address: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "consumer",
    address: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    const dataToSubmit = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      userType: formData.userType,
      address: formData.address, 
    };

    // Call the register thunk action
    const response = await dispatch(registerUser(dataToSubmit as FormData));
    if (typeof response.payload !== "string" && response.payload?.user) {
      navigate("/");
    } else {
      console.log(response)
      toast.error(response.payload as string);
    }
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
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
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
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
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
            name="username"
            value={formData.username}
            onChange={handleInputChange}
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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
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
            name="password"
            value={formData.password}
            onChange={handleInputChange}
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
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            placeholder="Re-enter your password"
            required
          />
        </div>

        {/* Password Error */}
        {passwordError && (
          <p className="text-red-500 text-sm mb-4">{passwordError}</p>
        )}

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-lg mb-2 flex items-center"
          >
            <MapPinIcon className="h-5 w-5 mr-2" />
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            placeholder="Enter your Address"
            required
          />
        </div>

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
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
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
