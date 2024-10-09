import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/authSlice";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("consumer");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call for login
    const fakeToken = "123456"; // Simulate a token from backend
    dispatch(loginSuccess({ email, token: fakeToken, userType }));

    // Redirect after login
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-lg mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="userType" className="block text-lg mb-2">
            User Type
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option value="consumer">Consumer</option>
            <option value="business">Business</option>
            <option value="artisan">Artisan</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
