"use client";
import React, { useContext, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import img1 from "../assets/team1.jpg";
import Image from "next/image";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { motion } from "framer-motion"; // Import framer-motion for animations
import Footer from "../components/Footer";
import ThemeContext from "../ThemeContext";

const ContactPage = () => {
  const { theme } = useContext(ThemeContext);
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    from_number: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_kzu7one",
        "template_5q4vpsc",
        form.current,
        "zRkvSsQvoodYpGJNx"
      )
      .then(
        () => {
          alert("SUCCESS!");
          setFormData({
            from_name: "",
            from_email: "",
            from_number: "",
            message: "",
          });
        },
        (error) => {
          alert("FAILED... " + error.text);
        }
      );
  };

  return (
    <>
      <div
        className={`min-h-screen ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
        }`}
      >
        {/* Top Section: Background Image with Heading */}
        <div className="relative flex flex-col items-center pt-5 pl-5 pr-5 md:pl-10 md:pr-10 lg:pl-32 lg:pr-32 min-h-screen">
          <div className="relative w-full h-[50vh]">
            <Image
              src={img1}
              alt="Contact"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="brightness-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-7xl font-bold text-white text-center">
                Contact Us
              </h1>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="pt-10 pb-10">
            <motion.div
              className={`flex flex-col p-5 md:p-10 ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-200"
                  : "bg-white text-black"
              } min-h-screen md:flex-row`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }} // Trigger at 30% visibility
              variants={{
                hidden: { opacity: 0, x: -50 }, // Start from the left
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              {/* Left Section: Contact Information */}
              <div
                className={`md:w-1/2 w-full p-5 flex flex-col justify-center space-y-8 ${
                  theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-100"
                }`}
              >
                <h2 className="text-4xl font-bold">Always Here to Help You</h2>
                <p className="text-lg">
                  Rest assured that we are perpetually available and committed
                  to providing you with the assistance you need.
                </p>

                {/* Location */}
                <div className="flex items-center space-x-4">
                  <FiMapPin className="text-blue-500 text-4xl" />
                  <div>
                    <h3 className="text-lg font-bold">Location</h3>
                    <p>
                      #235, 2nd & 3rd Floor, Indira Nagar II Stage, Bengaluru,
                      Karnataka 560038
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-center space-x-4">
                  <FiPhone className="text-blue-500 text-4xl" />
                  <div>
                    <h3 className="text-lg font-bold">Contact</h3>
                    <p>+919731910827</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <FiMail className="text-blue-500 text-4xl" />
                  <div>
                    <h3 className="text-lg font-bold">Email</h3>
                    <p>support@campalin.com</p>
                  </div>
                </div>

                {/* Hours of Operation */}
                <div className="flex items-center space-x-4">
                  <FiClock className="text-blue-500 text-4xl" />
                  <div>
                    <h3 className="text-lg font-bold">Hours of Operation</h3>
                    <p>Tue–Sun: 10:00AM – 7:30PM</p>
                    <p>Monday: Holiday</p>
                  </div>
                </div>
              </div>

              {/* Right Section: Contact Form */}
              <div
                className={`md:w-1/2 w-full p-5 md:p-10 flex flex-col justify-center ${
                  theme === "dark" ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                <h2 className="text-4xl font-bold mb-6">
                  Ready To Get Started?
                </h2>
                <p className="mb-6">
                  Your email address will not be published. Required fields are
                  marked.
                </p>

                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="from_email"
                      value={formData.from_email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      placeholder="Your Email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-semibold mb-2">
                      Enter Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="from_number"
                      value={formData.from_number}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      placeholder="Your Phone Number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-semibold mb-2"
                    >
                      Write a message...
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-200 text-gray-800"
                      }`}
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="accept"
                      className="h-5 w-5 text-blue-500 focus:ring-0 focus:outline-none"
                    />
                    <label htmlFor="accept">
                      Accept{" "}
                      <a href="#" className="text-blue-400 underline">
                        terms
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-400 underline">
                        privacy policy
                      </a>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`w-full px-6 py-3 font-bold rounded-md ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-200 hover:bg-gray-600 hover:text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-black"
                    }`}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              className="w-full pt-10 flex flex-col items-center  md:px-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }} // Trigger at 30% visibility
              variants={{
                hidden: { opacity: 0, x: -50 }, // Start from the left
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <div
                className={` rounded-lg shadow-lg p-6 md:p-10 w-full ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-200"
                    : "bg-white text-black"
                }`}
              >
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
                  Our Location
                </h2>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1011861836965!2d78.80720521482198!3d14.748186689712224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb3f3f21ba1e87b%3A0x143607ef508f44f9!2sBadvel%2C%20Andhra%20Pradesh%20516447!5e0!3m2!1sen!2sin!4v1633520576359!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Company Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
