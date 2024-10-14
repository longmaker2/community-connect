import React, { useState } from "react";
import { useAppDispatch } from "../redux/store/store";
import { useNavigate, Link } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { loginUser } from "../redux/slices/userSlice";

interface FormData {
  email: string;
  password: string;
  userType: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    userType: "consumer",
  });
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = {
      email: formData.email, // Assuming the backend expects 'email' instead of 'identifier'
      password: formData.password,
    };

    // Call the login thunk action
    const response = await dispatch(loginUser(loginData));
    if (typeof response.payload !== "string" && response.payload?.token) {
      navigate("/");
    } else {
      console.log(response);
      window.alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md my-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        {/* Username or Email */}
        <div className="mb-4">
          <label
            htmlFor="identifier"
            className="block text-lg mb-2 flex items-center"
          >
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            placeholder="Enter your email or username"
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
            placeholder="Enter your password"
            minLength={8}
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

        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-600 hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
        >
          <span>Login</span>
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline hover:text-blue-700 transition"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
