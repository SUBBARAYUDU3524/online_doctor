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
      title: "Slide 1",
      subtitle: "This is the first slide subtitle",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
    },
    {
      src: doctor1,
      title: "Slide 2",
      subtitle: "This is the second slide subtitle",
      text: "Sed posuere consectetur est at lobortis. Aenean lacinia bibendum nulla sed consectetur.",
    },
    {
      src: doctor2,
      title: "Slide 3",
      subtitle: "This is the third slide subtitle",
      text: "Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra.",
    },
    {
      src: doctor3,
      title: "Slide 4",
      subtitle: "This is the fourth slide subtitle",
      text: "Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor.",
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
              <p className="px-4">{image.text}</p>
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
