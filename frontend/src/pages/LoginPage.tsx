import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../features/authSlice";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("consumer");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const fakeToken = "123456";
    dispatch(loginSuccess({ email: identifier, token: fakeToken, userType }));
    navigate("/");
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
            Email or Username
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
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
