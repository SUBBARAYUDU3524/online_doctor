"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import ThemeContext from "./ThemeContext";
import { TypeAnimation } from "react-type-animation";
import { SiGooglegemini } from "react-icons/si";
import errtek from "./assets/home1.jpg";
import Tilt from "react-parallax-tilt";
import imgTree from "./assets/home1.jpg"; // Replace with your image import
import Image from "next/image";
import ProjectCorousal from "./components/ProjectCarousel";
import { FaUserMd } from "react-icons/fa";

const Page = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`min-h-screen ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
        }`}
      >
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className="text-center py-20 h-[400px]  md:h-auto"
        >
          {/* Heading with typing animation */}
          <h1 className="text-xl md:text-2xl font-bold mb-4 flex justify-center items-center lg:text-3xl">
            <TypeAnimation
              sequence={[
                "Welcome to ONLINE DOCTOR", // Sentence 1
                5000, // Show for 5s
                "Innovating the Future with Technology", // Sentence 2
                3000, // Show for 3s
                "Empowering Businesses with Tech Solutions", // Sentence 3
                4000, // Show for 4s
                "Your Digital Transformation Partner", // Sentence 4
                3000, // Show for 3s
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-4xl md:text-6xl font-bold"
            />
            <motion.span
              className="ml-2 text-3xl sm:text-3xl md:text-4xl lg:text-5xl"
              animate={{ rotate: [0, -20, 20, -20, 20, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                repeatDelay: 5,
              }}
            >
              👋
            </motion.span>
          </h1>

          {/* Subtitle Text with Tailwind styling */}
          <p className="text-lg md:text-2xl mb-8">
            Your source for tech solutions, insights, and innovation.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
          >
            Explore Our Services
          </motion.button>
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className=" sm:px-6 md:px-10 lg:px-14"
        >
          <Carousel />
        </motion.div>

        {/* About ONLINE DOCTOR Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className={`py-16 px-4  mt-10 sm:px-6 md:px-10 lg:px-14 rounded-lg shadow-lg lg:mx-16 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left Side Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="w-full md:w-1/2"
            >
              <Image
                src={errtek}
                alt="About ONLINE DOCTOR"
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Right Side Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="w-full md:w-1/2 space-y-4"
            >
              <h2 className="text-3xl font-bold text-center mb-8">
                About ONLINE DOCTOR
              </h2>

              <h3 className="text-2xl font-semibold mb-2">
                Innovating the Future with Technology
              </h3>
              <p className="text-lg">
                At ONLINE DOCTOR, we’re passionate about driving technological
                progress. Our mission is to provide cutting-edge tech solutions
                tailored to meet the needs of modern businesses and individuals.
              </p>
              <p className="text-lg">
                Our team of experts is dedicated to innovation, quality, and
                excellence. From web development to tech consulting, we are here
                to empower you with the tools you need for success in today’s
                digital world.
              </p>
              <p className="text-lg">
                Discover what ONLINE DOCTOR can do for you – let’s create
                something extraordinary together.
              </p>
              {/* Centered Button */}
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                >
                  View About Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Services Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className={`py-16 px-4  mt-10 sm:px-6 md:px-10 lg:px-14  rounded-lg shadow-lg lg:mx-16 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Key Services
          </h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            }}
          >
            {/* Service Boxes */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-lg shadow-lg "
            >
              <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              <p>
                High-quality, responsive websites tailored to your needs and
                designed with modern technology.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-lg shadow-lg "
            >
              <h3 className="text-xl font-semibold mb-2">Tech Consulting</h3>
              <p>
                Get expert advice on your tech stack, development processes, and
                digital strategy.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-lg shadow-lg "
            >
              <h3 className="text-xl font-semibold mb-2">
                Innovative Solutions
              </h3>
              <p>
                Cutting-edge solutions to keep you ahead in the rapidly evolving
                tech landscape.
              </p>
            </motion.div>
          </motion.div>

          {/* View All Services Button */}
          <motion.div
            className="mt-8 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              View All Services
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Featured Team Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className={`px-4  mt-10 sm:px-6 md:px-10 lg:px-14 rounded-lg shadow-lg lg:mx-16 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Side Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="w-full md:w-1/2"
            >
              <ProjectCorousal />
            </motion.div>

            {/* Right Side Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="w-full md:w-1/2 "
            >
              <h2 className="text-3xl font-bold text-center mb-5">
                About Our Team
              </h2>

              <h3 className="text-2xl font-semibold mb-2 text-center">
                Innovating the Future with Technology
              </h3>
              <p className="text-lg">
                At ONLINE DOCTOR, we’re passionate about driving technological
                progress. Our mission is to provide cutting-edge tech solutions
                tailored to meet the needs of modern businesses and individuals.
              </p>
              <p className="text-lg">
                Our team of experts is dedicated to innovation, quality, and
                excellence. From web development to tech consulting, we are here
                to empower you with the tools you need for success in today’s
                digital world.
              </p>
              <p className="text-lg">
                Discover what ONLINE DOCTOR can do for you – let’s create
                something extraordinary together.
              </p>
              {/* Centered Button */}
              <div className="flex justify-center pb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 pb-4 mt-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                >
                  View Our Team
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className={`py-16 px-4 mt-10 sm:px-6 md:px-10 lg:px-14 rounded-lg shadow-lg lg:mx-16 ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left Side Image with Tilt Effect */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="w-full md:w-1/2"
            >
              <Tilt
                className="parallax-effect-img"
                tiltMaxAngleX={40}
                tiltMaxAngleY={40}
                perspective={800}
                transitionSpeed={1500}
                scale={1.1}
                gyroscope={true}
              >
                <Image
                  src={imgTree} // Or replace with your `errtek` image
                  alt="About ONLINE DOCTOR"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg inner-element"
                />
              </Tilt>
            </motion.div>

            {/* Right Side Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="w-full md:w-1/2 space-y-4"
            >
              <h2 className="text-3xl font-bold text-center mb-8">
                About ONLINE DOCTOR Projects
              </h2>

              <p className="text-lg">
                At ONLINE DOCTOR, we’re passionate about driving technological
                progress. Our mission is to provide cutting-edge tech solutions
                tailored to meet the needs of modern businesses and individuals.
              </p>
              <p className="text-lg">
                Our team of experts is dedicated to innovation, quality, and
                excellence. From web development to tech consulting, we are here
                to empower you with the tools you need for success in today’s
                digital world.
              </p>
              <p className="text-lg">
                Discover what ONLINE DOCTOR can do for you – let’s create
                something extraordinary together.
              </p>
              {/* Centered Button */}
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                >
                  View About Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer with Gemini Icon Fixed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="px-4 sm:px-6 md:px-10 lg:px-14"
        >
          <Footer />
          {/* Gemini Icon */}
          <motion.a
            href="/doctors"
            className="fixed right-4 mr-10 bottom-4 md:bottom-8 md:right-8 bg-blue-600 p-4 rounded-full shadow-lg text-white hover:bg-blue-700 z-50"
            whileHover={{ scale: 1.1 }}
            title="Doctor"
          >
            <FaUserMd size={24} />
          </motion.a>
        </motion.div>
      </div>
    </>
  );
};

export default Page;
