"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaProjectDiagram,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaShoppingCart,
  FaSpinner,
} from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThemeContext from "../ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import UserContext from "../UserContext";
import { auth } from "../FirebaseConfig";

const Navbar = () => {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("home");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const { currentUser, cartItems, userType } = useContext(UserContext);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (localStorage.getItem("userType")) {
        localStorage.removeItem("userType");
      }
      if (localStorage.getItem("userToken")) {
        localStorage.removeItem("userToken");
      }
      if (localStorage.getItem("doctorToken")) {
        localStorage.removeItem("doctorToken");
      }

      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events?.on("routeChangeStart", handleRouteChangeStart);
    router.events?.on("routeChangeComplete", handleRouteChangeComplete);
    router.events?.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events?.off("routeChangeStart", handleRouteChangeStart);
      router.events?.off("routeChangeComplete", handleRouteChangeComplete);
      router.events?.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);

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
          <Link href="/"> 🧑‍⚕️ONLINE DOCTOR</Link>
        </div>

        <div className="hidden md:flex space-x-8 items-center relative">
          {["home", "store", "services", "contact"].map((link) => (
            <Link href={link === "home" ? "/" : `/${link}`} key={link}>
              <span
                className={`text-xl font-semibold ${
                  activeLink === link
                    ? theme === "dark"
                      ? "text-blue-400"
                      : "text-blue-600"
                    : theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                }`}
                onClick={() => setActiveLink(link)}
              >
                {link.charAt(0).toUpperCase() + link.slice(1).replace("-", " ")}
              </span>
            </Link>
          ))}

          {currentUser && userType === "user" && (
            <Link href="/userChat">
              <span
                className={`text-xl font-semibold ${
                  activeLink === "userChat"
                    ? theme === "dark"
                      ? "text-blue-400"
                      : "text-blue-600"
                    : theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                }`}
                onClick={() => setActiveLink("userChat")}
              >
                User Chat
              </span>
            </Link>
          )}

          {currentUser && userType === "doctor" && (
            <Link href="/doctorchat">
              <span
                className={`text-xl font-semibold ${
                  activeLink === "doctorchat"
                    ? theme === "dark"
                      ? "text-blue-400"
                      : "text-blue-600"
                    : theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
                }`}
                onClick={() => setActiveLink("doctorchat")}
              >
                Doctor Chat
              </span>
            </Link>
          )}

          {currentUser && (
            <>
              <Link href="/aiDoctor">
                <span
                  className={`text-xl font-semibold ${
                    activeLink === "aiDoctor"
                      ? theme === "dark"
                        ? "text-blue-400"
                        : "text-blue-600"
                      : theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                  onClick={() => setActiveLink("aiDoctor")}
                >
                  AI Doctor
                </span>
              </Link>

              <Link href="/doctors">
                <span
                  className={`text-xl font-semibold ${
                    activeLink === "doctors"
                      ? theme === "dark"
                        ? "text-blue-400"
                        : "text-blue-600"
                      : theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                  onClick={() => setActiveLink("doctors")}
                >
                  Doctors
                </span>
              </Link>
            </>
          )}

          <button onClick={handleThemeToggle} className="text-2xl">
            {theme === "dark" ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>

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

          {currentUser ? (
            <div className="relative">
              <Image
                onClick={toggleModal}
                src={
                  currentUser?.photoURL ||
                  "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                width={40}
                height={40}
              />

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
                      onClick={handleLogout}
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
              <span
                className="text-xl font-semibold"
                onClick={() => {
                  setActiveLink("login");
                  toggleMobileMenu();
                }}
              >
                Login
              </span>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        <div
          className={`fixed inset-0 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40 md:hidden ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          } w-[70%] md:w-[40%]`}
        >
          <div className="flex flex-col h-full px-8 py-6 overflow-y-auto">
            <div
              className={`flex justify-end p-2 ${
                theme === "dark"
                  ? "bg-gray-600 text white"
                  : "bg-blue-200 text-black"
              }`}
            >
              <button onClick={handleThemeToggle} className="text-2xl">
                {theme === "dark" ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-800" />
                )}
              </button>
            </div>

            <div
              className={`p-4 mb-4 ${
                theme === "dark"
                  ? "bg-gray-600 text white"
                  : "bg-blue-200 text-black"
              }`}
            >
              {currentUser ? (
                <div className="flex flex-col items-center space-y-2">
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
                    onClick={() => {
                      setActiveLink("login");
                      toggleMobileMenu();
                    }}
                  >
                    Login
                  </span>
                </Link>
              )}
            </div>

            <div className="flex flex-col">
              <Link href="/">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "home"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("home");
                    toggleMobileMenu();
                  }}
                >
                  <FaHome className="mr-2" />
                  Home
                </span>
              </Link>

              <Link href="/store">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "store"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("store");
                    toggleMobileMenu();
                  }}
                >
                  <FaInfoCircle className="mr-2" />
                  Online Store
                </span>
              </Link>

              <Link href="/services">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "services"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("services");
                    toggleMobileMenu();
                  }}
                >
                  <FaServicestack className="mr-2" />
                  Services
                </span>
              </Link>

              {currentUser && userType === "user" && (
                <Link href="/userChat">
                  <span
                    className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                      activeLink === "userChat"
                        ? "text-blue-400"
                        : theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                    onClick={() => {
                      setActiveLink("userChat");
                      toggleMobileMenu();
                    }}
                  >
                    <FaServicestack className="mr-2" />
                    User Chat
                  </span>
                </Link>
              )}

              {currentUser && userType === "doctor" && (
                <Link href="/doctorchat">
                  <span
                    className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                      activeLink === "doctorchat"
                        ? "text-blue-400"
                        : theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                    onClick={() => {
                      setActiveLink("doctorchat");
                      toggleMobileMenu();
                    }}
                  >
                    <FaServicestack className="mr-2" />
                    Doctor Chat
                  </span>
                </Link>
              )}

              {currentUser && (
                <>
                  <Link href="/aiDoctor">
                    <span
                      className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                        activeLink === "aiDoctor"
                          ? "text-blue-400"
                          : theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                      onClick={() => {
                        setActiveLink("aiDoctor");
                        toggleMobileMenu();
                      }}
                    >
                      <FaProjectDiagram className="mr-2" />
                      AI Doctor
                    </span>
                  </Link>

                  <Link href="/doctors">
                    <span
                      className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                        activeLink === "doctors"
                          ? "text-blue-400"
                          : theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                      onClick={() => {
                        setActiveLink("doctors");
                        toggleMobileMenu();
                      }}
                    >
                      <FaProjectDiagram className="mr-2" />
                      Doctors
                    </span>
                  </Link>
                </>
              )}

              <Link href="/contact">
                <span
                  className={`flex items-center py-4 text-xl md:text-2xl font-semibold ${
                    activeLink === "contact"
                      ? "text-blue-400"
                      : theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    setActiveLink("contact");
                    toggleMobileMenu();
                  }}
                >
                  <FaEnvelope className="mr-2" />
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <FaSpinner className="text-white text-4xl animate-spin" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
