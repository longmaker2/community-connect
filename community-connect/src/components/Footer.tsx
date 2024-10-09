import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Community Connect</h3>
            <p className="text-gray-400">
              Discover local businesses, services, and more through Community
              Connect. Your trusted platform for connecting with service
              providers near you.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-gray-300 transition duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/booking"
                  className="hover:text-gray-300 transition duration-200"
                >
                  Booking
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="hover:text-gray-300 transition duration-200"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="hover:text-gray-300 transition duration-200"
                >
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61551252043455"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/longmakergutajah/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/LongMakerGutaja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/long-maker-long-deng/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <FaLinkedinIn className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Community Connect. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
