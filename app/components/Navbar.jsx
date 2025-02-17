"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import {
  FaEdit,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaProjectDiagram,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaShoppingCart, // Import the cart icon
} from "react-icons/fa"; // Added FaBars and FaTimes for mobile toggle
import Image from "next/image";

import { useRouter } from "next/navigation";
import ThemeContext from "../ThemeContext";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion for animations
import UserContext from "../UserContext";
import { auth } from "../FirebaseConfig";

const Navbar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("home");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const modalRef = useRef(null);
  const { currentUser, cartItems } = useContext(UserContext);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false); // Close modal when clicking outside
    }
  };

  // Check the authentication state and set the current user

  // Handle user sign out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
    console.log("Modal state after toggle:", !isModalOpen);
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`bg-white text-gray-900 py-6 px-8 shadow-md sticky top-0 z-50 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold ">
          <Link href="/">ONLINE DOCTOR SERVICE</Link>
        </div>

        {/* Desktop Menu - Show on Large Screens */}
        <div className="hidden md:flex space-x-8 items-center relative">
          {/* Navigation Links */}
          {[
            "home",
            "store",
            "services",
            "userChat",
            "aiDoctor",
            "doctors",
            "contact",
          ].map((link) => (
            <Link href={link === "home" ? "/" : `/${link}`} key={link}>
              <span
                className={`text-xl font-semibold ${
                  activeLink === link
                    ? theme === "dark"
                      ? "text-blue-400" // Active link color in dark theme
                      : "text-blue-600" // Active link color in light theme
                    : theme === "dark"
                    ? "text-white" // Inactive link color in dark theme
                    : "text-gray-900" // Inactive link color in light theme
                }`}
                onClick={() => setActiveLink(link)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1).replace("-", " ")}
              </span>
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="text-2xl">
            {theme === "dark" ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>

          {/* Cart Icon */}
          <div className="relative">
            <Link href="/cart">
              <FaShoppingCart className="text-2xl cursor-pointer" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 rounded-full bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* User Profile */}
          {currentUser ? (
            <div className="relative">
              {/* Profile Image */}
              <Image
                onClick={toggleModal} // Open modal on click
                src={
                  currentUser?.photoURL ||
                  "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                width={40}
                height={40}
              />

              {/* Modal positioned from the right end */}
              <AnimatePresence>
                {isModalOpen && (
                  <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={`absolute right-0 top-0 mt-16 w-72 p-4 rounded-lg shadow-lg text-center z-10 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
                        : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
                    }`}
                  >
                    <Image
                      src={
                        currentUser?.photoURL ||
                        "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                      }
                      alt="User Avatar"
                      className="w-16 h-16 rounded-full mx-auto mb-4"
                      width={64}
                      height={64}
                    />
                    <p className="text-xl font-semibold">
                      {currentUser?.displayName}
                    </p>
                    <p className="text-sm mt-2 break-words">
                      {currentUser?.email}
                    </p>
                    <button
                      onClick={handleLogout} // Define handleLogout as needed
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login">
              <span className="text-xl font-semibold ">Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button - Show on Small and Medium Screens */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Fullscreen Mobile Navigation - Visible on Small and Medium Screens */}
        <div
          className={`fixed inset-0 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40 md:hidden ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          } w-[70%] md:w-[40%]`} // Set width to 80% on small screens, 50% on medium screens
        >
          <div className="flex flex-col  h-full px-8 py-6 overflow-y-auto">
            {/* Theme Toggle Button in Blue Background */}

            <div
              className={`flex justify-end  p-2 ${
                theme === "dark"
                  ? "bg-gray-600 text white"
                  : "bg-blue-200 text-black"
              }`}
            >
              <button onClick={toggleTheme} className="text-2xl">
                {theme === "dark" ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-800" />
                )}
              </button>
            </div>
            {/* User Profile Section */}
            <div
              className={`p-4  mb-4 ${
                theme === "dark"
                  ? "bg-gray-600 text white"
                  : "bg-blue-200 text-black"
              }`}
            >
              {" "}
              {/* Different color for user section */}
              {currentUser ? (
                <div className="flex flex-col items-center space-y-2">
                  {" "}
                  {/* Use flex-col for vertical stacking */}
                  <Image
                    onClick={toggleModal}
                    src={
                      currentUser?.photoURL ||
                      "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                    }
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full cursor-pointer"
                    width={64}
                    height={64}
                  />
                  <span className="text-xl">
                    {currentUser?.displayName || "User"}
                  </span>
                  <span className="text-md">
                    {currentUser?.email || "User"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <span
                    className={`text-xl font-semibold ${
                      activeLink === "login" ? "text-blue-400" : "text-gray-900"
                    }`}
                    onClick={() => setActiveLink("login")}
                  >
                    Login
                  </span>
                </Link>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col">
              <Link href="/">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "home"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white" // White text in dark mode
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("home");
                    toggleMobileMenu(); // Close menu on click
                  }}
                >
                  <FaHome className="mr-2" /> {/* Icon for Home */}
                  Home
                </span>
              </Link>

              <Link href="/store">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "store"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white" // White text in dark mode
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("store");
                    toggleMobileMenu(); // Close menu on click
                  }}
                >
                  <FaInfoCircle className="mr-2" /> {/* Icon for About Us */}
                  Online Store
                </span>
              </Link>

              <Link href="/services">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "services"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white" // White text in dark mode
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("services");
                    toggleMobileMenu(); // Close menu on click
                  }}
                >
                  <FaServicestack className="mr-2" /> {/* Icon for Services */}
                  Services
                </span>
              </Link>

              <Link href="/userChat">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "services"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white" // White text in dark mode
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("userchat");
                    toggleMobileMenu(); // Close menu on click
                  }}
                >
                  <FaServicestack className="mr-2" /> {/* Icon for Services */}
                  UserChat
                </span>
              </Link>

              <Link href="/aiDoctor">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "Consultant"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white" // White text in dark mode
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("aidoctor");
                    toggleMobileMenu(); // Close menu on click
                  }}
                >
                  <FaProjectDiagram className="mr-2" />{" "}
                  {/* Icon for Projects */}
                  AiDoctor
                </span>
              </Link>

              <Link href="/doctors">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "Consultant"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white" // White text in dark mode
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("doctors");
                    toggleMobileMenu(); // Close menu on click
                  }}
                >
                  <FaProjectDiagram className="mr-2" />{" "}
                  {/* Icon for Projects */}
                  Doctors
                </span>
              </Link>

              <Link href="/contact">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "contact"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white" // White text in dark mode
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("contact");
                    toggleMobileMenu(); // Close menu on click
                  }}
                >
                  <FaEnvelope className="mr-2" /> {/* Icon for Contact Us */}
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
