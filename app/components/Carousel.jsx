import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import doctor from "../assets/doc.jpg";
import doctor1 from "../assets/doctor.jpg";
import doctor2 from "../assets/doctor2.jpg";
import doctor3 from "../assets/doc.jpg";

const Carousel = () => {
  const images = [
    {
      src: doctor,
      title: "Online Ayurvedic Doctor: Healing Naturally with Ancient Wisdom",
      subtitle: "A Holistic Approach to Health and Wellness",
      text: "Ayurveda, an ancient system of natural healing, focuses on balancing the body, mind, and spirit. With the rise of online healthcare, consulting an Ayurvedic doctor has become more convenient, providing expert guidance on personalized treatments, herbal remedies, and lifestyle modifications from the comfort of your home.",
    },
    {
      src: doctor1,
      title: "Benefits of Online Ayurvedic Consultation",
      subtitle: "Personalized and Natural Healing Solutions",
      text: "Online Ayurvedic consultations offer customized treatment plans based on an individual’s unique body constitution (Prakriti). By understanding the root cause of ailments, Ayurvedic doctors suggest herbal medicines, dietary changes, and yoga practices that enhance overall well-being. These consultations are beneficial for managing chronic conditions like stress, digestive issues, skin disorders, and lifestyle-related diseases.",
    },
    {
      src: doctor2,
      title: "Choosing the Right Ayurvedic Doctor Online",
      subtitle: "Ensuring Authentic and Certified Expertise",
      text: "Finding a reliable online Ayurvedic doctor requires checking their qualifications, experience, and patient reviews. Reputable platforms provide certified professionals who offer virtual consultations, assess medical history, and recommend safe and effective treatments. Opting for a trusted Ayurvedic expert ensures holistic healing without side effects, promoting long-term wellness and balance.",
    },
    {
      src: doctor3,
      title: "Embrace Ayurveda Online: Natural Healing at Your Fingertips",
      subtitle: "Traditional Wisdom Meets Modern Convenience",
      text: "Ayurveda, the science of life, offers a natural and holistic approach to health and well-being. With online Ayurvedic consultations, people can now access expert guidance from qualified practitioners without the need for physical visits. These consultations provide personalized treatments, herbal remedies, and lifestyle modifications tailored to individual health needs.",
    },
  ];
  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      speed={600}
      pagination={{
        clickable: true,
      }}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      autoplay={{
        delay: 5000, // 5 seconds delay
        disableOnInteraction: false, // Allow interaction without stopping autoplay
      }}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper relative w-full md:w-full h-[80vh] mx-auto" // Increased height
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              src={image.src}
              layout="fill"
              objectFit="cover"
              alt={`Carousel image ${index + 1}`}
              className="rounded-lg"
              loading="lazy"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-black bg-opacity-50">
              <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
              <h3 className="text-xl mb-4">{image.subtitle}</h3>
              <p className="px-20">{image.text}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev text-white h-10 w-10 md:h-8 md:w-8 lg:h-10 lg:w-10" />
      <div className="swiper-button-next text-white h-10 w-10 md:h-8 md:w-8 lg:h-10 lg:w-10" />
    </Swiper>
  );
};

export default Carousel;
