"use client";
import React from "react";
import Link from "next/link";
import { FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  return (
    <div className="pt-5">
      <div className="  pb-5 ">
        <div className="bg-black text-white rounded-lg">
          <footer className="container mx-auto py-10 px-5 sm:px-10 md:px-16 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <h3 className="text-2xl font-bold mb-3">ERRTEKNALOZY</h3>
                <p>Learn Skills that make you Job-Ready!</p>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold mb-3">Get In Touch</h3>
                <div className="flex items-start mb-2">
                  <MdLocationOn className="mr-2 mt-1" />
                  <p>
                    235, 13th Cross Rd, Indira Nagar, Bengaluru, Karnataka
                    560038
                  </p>
                </div>
                <div className="flex items-start mb-2">
                  <MdEmail className="mr-2 mt-1" />
                  <p>support@.com</p>
                </div>
                <div className="flex items-start mb-2">
                  <MdPhone className="mr-2 mt-1" />
                  <p>9731910827</p>
                </div>
              </div>

              {/* Explore Links */}
              <div>
                <h3 className="text-xl font-bold mb-3">Explore Links</h3>
                <ul>
                  <li className="mb-2">
                    <Link href="/">
                      <span className="hover:underline cursor-pointer">
                        Programs
                      </span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/about">
                      <span className="hover:underline cursor-pointer">
                        About Us
                      </span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/contact">
                      <span className="hover:underline cursor-pointer">
                        Contact Us
                      </span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/login">
                      <span className="hover:underline cursor-pointer">
                        Log In
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-red-600"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-pink-500"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-blue-700"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} Errteknalozy Innovations. All
                rights reserved.
              </p>
              <div className="flex justify-center space-x-4 mt-3">
                <Link href="/terms">
                  <span className="hover:underline cursor-pointer">
                    Terms & Conditions
                  </span>
                </Link>
                <Link href="/privacy">
                  <span className="hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
                <Link href="/refund">
                  <span className="hover:underline cursor-pointer">
                    Refund Policy
                  </span>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
