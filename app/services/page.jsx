"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  FaLaptopCode,
  FaRocket,
  FaPaintBrush,
  FaChartLine,
} from "react-icons/fa"; // Import icons
import { SiGooglegemini } from "react-icons/si";

import getInTouch from "../assets/home1.jpg";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import chooseImg from "../assets/team3.jpg";
import chooseImg1 from "../assets/doctor2.jpg";
import chooseImg2 from "../assets/team2.jpg";
import Image from "next/image";
import ThemeContext from "../ThemeContext";
import Head from "next/head";

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const { theme } = useContext(ThemeContext);

  const testimonials = [
    {
      image: chooseImg, // Replace with the actual path of your images
      text: "iLander's team transformed our online presence, boosting our website traffic by 150%!",
      name: "Aron Loeb",
      role: "CEO, Company",
      rating: 5,
    },
    {
      image: chooseImg,
      text: "Their innovative approach and quality service has helped us reach new heights in customer satisfaction.",
      name: "Jane Doe",
      role: "CTO, TechCorp",
      rating: 4,
    },
    {
      image: chooseImg,
      text: "We are extremely happy with the results and look forward to future projects with iLander!",
      name: "Mark Smith",
      role: "Manager, Solutions Inc.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "What makes iLander’s website design unique?",
      answer:
        "We emphasize user-friendly designs with high-quality graphics tailored to your brand’s needs.",
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "Our development timeline varies depending on project complexity. Most projects take 4-8 weeks from start to finish.",
    },
    // Add more FAQs as needed
  ];

  const toggleFAQ = (index) => {
    // Set the clicked question as open, and close the previous one
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Automatically change testimonials every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const { image, text, name, role, rating } = testimonials[currentIndex];

  return (
    <>
      <Head>
        {/* Primary SEO Meta Tags */}
        <title>
          ErrTeknalozy | Our Services - Web Development & App Solutions
        </title>
        <meta
          name="description"
          content="Explore ErrTeknalozy's comprehensive services in web development and app development, tailored to meet your business needs."
        />
        <meta
          name="keywords"
          content="ErrTeknalozy, Services, Web Development, App Development, Custom Software Solutions, E-commerce Development, Mobile App Development, Website Design, Digital Marketing, SEO Services, Technology Solutions, IT Consulting, Software Development, UI/UX Design, Cloud Services"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://errteknalozy.in/services" />
        <meta
          property="og:title"
          content="ErrTeknalozy | Our Services - Web Development & App Solutions"
        />
        <meta
          property="og:description"
          content="Discover our services at ErrTeknalozy, offering expert web and app development solutions to elevate your business."
        />
        <meta
          property="og:image"
          content="https://errteknalozy.in/og-image-services.jpg"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://errteknalozy.in/services" />
        <meta
          name="twitter:title"
          content="ErrTeknalozy | Our Services - Web Development & App Solutions"
        />
        <meta
          name="twitter:description"
          content="Discover our services at ErrTeknalozy, offering expert web and app development solutions to elevate your business."
        />
        <meta
          name="twitter:image"
          content="https://errteknalozy.in/twitter-image-services.jpg"
        />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ErrTeknalozy Services",
            url: "https://errteknalozy.in/services",
            description:
              "Explore ErrTeknalozy's services in web and app development, providing tailored solutions for modern businesses.",
            mainEntityOfPage: {
              "@type": "WebSite",
              "@id": "https://errteknalozy.in",
            },
          })}
        </script>
      </Head>

      <div
        className={`min-h-screen  flex flex-col items-center py-10 px-4 md:px-10 lg:px-32 lg:text-lg ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
        }`}
      >
        {/* Header */}

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-10 ">
          Our Services
        </h2>

        {/* Service List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Trigger at 30% visibility
          variants={{
            hidden: { opacity: 0, x: -50 }, // Change x value as needed
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className=" p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer w-full text-center mx-auto"
        >
          <div className="relative w-full max-w-4xl mx-auto my-5">
            {/* Vertical Line for desktop */}
            <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>

            {/* Service 1 - Website Designing */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="flex flex-col md:flex-row items-center mb-10 text-center md:text-left"
            >
              <div className="w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-10 mb-6 md:mb-0">
                <div className="bg-pink-100 p-6 md:p-8 rounded-full">
                  <FaLaptopCode className="text-pink-500 text-3xl md:text-4xl" />
                </div>
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-10">
                <h3 className="text-pink-500 font-bold text-lg md:text-xl">
                  Personalized Consultation
                </h3>
                <p className="text-gray-600 mt-2">
                  Get one-on-one guidance from experienced Ayurvedic doctors,
                  customized to your health needs and body type.
                </p>
              </div>
            </motion.div>

            {/* Service 2 - Website Development */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="flex flex-col md:flex-row items-center mb-10 text-center md:text-left"
            >
              <div className="w-full md:w-1/2 pl-0 md:pl-10 mb-6 md:mb-0 order-last md:order-first">
                <h3 className="text-orange-500 font-bold text-lg md:text-xl">
                  Herbal Remedies & Treatment Plans
                </h3>
                <p className="text-gray-600 mt-2 pr-5">
                  Effective Ayurvedic solutions for diabetes, arthritis,
                  digestive issues, stress, and more, focusing on root-cause
                  healing.
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:justify-start pl-0 md:pl-10">
                <div className="bg-orange-100 p-6 md:p-8 rounded-full">
                  <FaRocket className="text-orange-500 text-3xl md:text-4xl" />
                </div>
              </div>
            </motion.div>

            {/* Service 3 - Graphic Designing */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="flex flex-col md:flex-row items-center mb-10 text-center md:text-left"
            >
              <div className="w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-10 mb-6 md:mb-0">
                <div className="bg-green-100 p-6 md:p-8 rounded-full">
                  <FaPaintBrush className="text-green-500 text-3xl md:text-4xl" />
                </div>
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-10">
                <h3 className="text-green-500 font-bold text-lg md:text-xl">
                  Diet & Lifestyle Guidance
                </h3>
                <p className="text-gray-600 mt-2">
                  Personalized diet and lifestyle recommendations based on
                  Ayurveda to enhance immunity and overall well-being.
                </p>
              </div>
            </motion.div>

            {/* Service 4 - Digital Marketing */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="flex flex-col md:flex-row items-center mb-10 text-center md:text-left"
            >
              <div className="w-full md:w-1/2 pl-0 md:pl-10 mb-6 md:mb-0 order-last md:order-first">
                <h3 className="text-teal-500 font-bold text-lg md:text-xl">
                  Detox & Rejuvenation Therapies
                </h3>
                <p className="text-gray-600 mt-2 pr-5">
                  Cleansing and detoxification treatments like Panchakarma to
                  remove toxins and restore energy.
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:justify-start pl-0 md:pl-10">
                <div className="bg-teal-100 p-6 md:p-8 rounded-full">
                  <FaChartLine className="text-teal-500 text-3xl md:text-4xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Choose Us */}

        <div
          className={`py-6 px-4 rounded-lg shadow-md my-10 w-full flex flex-col md:flex-row transform transition-all duration-300 hover:shadow-lg hover:scale-105 ${
            theme === "dark"
              ? "text-gray-200 bg-gray-800"
              : "text-gray-600 bg-white"
          }`}
        >
          {/* Image on the left */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <Image
              src={chooseImg2} // Replace with your image source
              alt="Description of the image"
              width={400}
              height={400}
              className="w-full h-auto rounded-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Text content on the right */}
          <div className="w-full md:w-2/3 pl-0 md:pl-4 lg:pt-8 lg:pl-10 lg:mt-20">
            <h3 className="text-2xl font-bold mb-4 text-left">
              Why Choose Us?
            </h3>
            <p className="text-left text-base md:text-lg leading-relaxed mt-10">
              In today’s fast-paced world, accessing reliable healthcare can be
              challenging, but with our online Ayurvedic doctor consu ltation,
              you receive expert guidance from the comfort of your home. We
              blend ancient Ayurvedic wisdom with modern convenience, offering
              personalized treatments tailored to your unique body constitution.
              Our experienced practitioners provide holistic solutions for
              chronic ailments, stress management, immunity boosting, and
              overall well-being. With natural, side-effect-free remedies and a
              patient-centric approach, we ensure safe and effective healing.
              Our commitment to authenticity, affordability, and accessibility
              makes us a trusted choice for those seeking a healthier, balanced
              life through
            </p>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="bg-blue-600 py-6 px-4 rounded-lg shadow-md my-10 w-full flex flex-col items-center">
          {/* Image */}
          <div className="relative mb-4">
            <Image
              src={image}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
              width={96}
              height={96}
            />
          </div>

          {/* Testimonial Text */}
          <p className="text-white text-center px-4 mb-4">"{text}"</p>

          {/* Client Name and Role */}
          <h4 className="text-white font-bold">{name}</h4>
          <p className="text-white">{role}</p>

          {/* Star Rating */}
          <div className="flex space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < rating ? "text-yellow-400" : "text-gray-400"}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className={`my-10 w-full max-w-4xl p-6 rounded-lg shadow-lg ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
              : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
          }`}
        >
          <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="mb-4 border-b border-gray-300 pb-4"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h4 className="text-lg font-semibold">{faq.question}</h4>
                {openIndex === index ? (
                  <FiChevronUp className="text-blue-700" />
                ) : (
                  <FiChevronDown className="text-blue-700" />
                )}
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="mt-2 text-gray-600 dark:text-gray-400"
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action (CTA) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className={`my-10 w-full p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
              : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
          }`}
        >
          {/* Image with hover effect */}
          <div className="flex-shrink-0 w-full md:w-1/3 overflow-hidden rounded-lg mb-4 md:mb-0 md:mr-6">
            <motion.div
              className="transition-transform duration-300 hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={getInTouch} // Image source
                alt="Elevate your brand"
                width={300} // Specify width
                height={300} // Specify height
                layout="responsive" // Ensures responsive layout
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>

          {/* Text content */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-2xl font-bold text-blue-700">
              Ready to elevate your brand?
            </h3>
            <p className="text-gray-600 mt-2 dark:text-gray-400">
              Discover how our team of experts can help you achieve your goals.
              Partner with us to enhance your brand's visibility, engage your
              audience, and take your business to the next level. We're here to
              provide creative solutions tailored just for you.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600">
              Contact Us
            </button>
          </div>
        </motion.div>

        {/* Gemini Icon */}
        <motion.a
          href="/geminiai"
          className="fixed right-4 bottom-4 md:bottom-8 md:right-8 bg-blue-600 p-4 rounded-full shadow-lg text-white hover:bg-blue-700 z-50"
          whileHover={{ scale: 1.1 }}
          title="Gemini"
        >
          <SiGooglegemini size={24} />
        </motion.a>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Services;
