"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// Import Swiper modules
import { EffectCube, Pagination, Autoplay } from "swiper/modules";
import ThemeContext from "../ThemeContext";

export default function ProjectCorousal() {
  const { theme } = useContext(ThemeContext);
  const images = [
    "https://images.pexels.com/photos/8460371/pexels-photo-8460371.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://media.istockphoto.com/id/543351810/photo/your-health-in-our-hands.jpg?b=1&s=612x612&w=0&k=20&c=QT40eiRlNGxoyfuzZZHuq47pQN4jEkVZsmPPNmbdkAI=",
    "https://media.istockphoto.com/id/855467422/photo/in-it-to-saves-lives-together.jpg?b=1&s=612x612&w=0&k=20&c=QPsag9FAuqSUPRhFTPhW408WFEjUXbEu6Togc07k2BY=",
    "https://images.pexels.com/photos/4270368/pexels-photo-4270368.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div className={`w-full h-screen flex items-center justify-center `}>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000, // 5 seconds
          disableOnInteraction: false,
        }}
        loop={true} // Enable loop to go from last slide to the first seamlessly
        modules={[EffectCube, Pagination, Autoplay]}
        className="mySwiper w-full max-w-lg h-96 "
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
