import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProfilePicture from "../assets/images/Long-profile-picture.jpg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Bookings", href: "/bookings" },
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    "You have a new booking request.",
    "Your profile has been updated successfully.",
    "You received a 5-star rating from a customer.",
  ];

  const toggleNotification = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  const handleSignOut = () => {
    console.log("User signed out");
    navigate("/login");
  };

  // Determine which link is active based on current route
  const isActiveLink = (href: string) => location.pathname === href;

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-transform duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          isActiveLink(item.href)
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-transform duration-200",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          isActiveLink(item.href) ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notification Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={toggleNotification}
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-transform duration-200"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Notification Dropdown */}
                  <Transition
                    show={isNotificationOpen}
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 transition-all duration-300 ease-in-out">
                      <div className="p-4 text-sm font-semibold text-gray-800 border-b">
                        Notifications
                      </div>
                      <ul className="max-h-60 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification, index) => (
                            <li
                              key={index}
                              className="p-4 text-gray-600 border-b last:border-none"
                            >
                              {notification}
                            </li>
                          ))
                        ) : (
                          <li className="p-4 text-gray-500">
                            No notifications
                          </li>
                        )}
                      </ul>
                    </div>
                  </Transition>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-transform duration-200">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={ProfilePicture}
                        alt="User Avatar"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all transform duration-300">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    isActiveLink(item.href)
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-transform duration-200",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={isActiveLink(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
