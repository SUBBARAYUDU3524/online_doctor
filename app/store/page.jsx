"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import product1 from "../assets/store1.jpg";
import product2 from "../assets/store2.jpg";
import product3 from "../assets/store3.jpg";
import product4 from "../assets/store4.jpg";
import product5 from "../assets/store5.jpg";
import product6 from "../assets/store6.jpg";
import product7 from "../assets/store7.jpg";
import product8 from "../assets/store8.jpg";
import product9 from "../assets/store9.jpg";
import UserContext from "../UserContext";
import { FaStar } from "react-icons/fa";
import ThemeContext from "../ThemeContext";

const Store = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addItemToCart } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Paracetamol",
      image: product3,
      price: "₹120",
      originalPrice: "₹200",
      discount: "40% off",
      rating: 4.2,
      reviews: 1250,
    },
    {
      id: 2,
      name: "Vitamin C Tablets",
      image: product2,
      price: "₹120",
      originalPrice: "₹180",
      discount: "33% off",
      rating: 4.0,
      reviews: 980,
    },
    {
      id: 3,
      name: "Cough Syrup",
      image: product1,
      price: "₹80",
      originalPrice: "₹150",
      discount: "47% off",
      rating: 3.9,
      reviews: 700,
    },
    {
      id: 4,
      name: "Pain Relief Spray",
      image: product4,
      price: "₹150",
      originalPrice: "₹220",
      discount: "32% off",
      rating: 4.5,
      reviews: 1600,
    },
    {
      id: 5,
      name: "Paracetamol",
      image: product5,
      price: "₹120",
      originalPrice: "₹200",
      discount: "40% off",
      rating: 4.2,
      reviews: 1250,
    },
    {
      id: 6,
      name: "Vitamin C Tablets",
      image: product6,
      price: "₹120",
      originalPrice: "₹180",
      discount: "33% off",
      rating: 4.0,
      reviews: 980,
    },
    {
      id: 7,
      name: "Cough Syrup",
      image: product7,
      price: "₹80",
      originalPrice: "₹150",
      discount: "47% off",
      rating: 3.9,
      reviews: 700,
    },
    {
      id: 8,
      name: "Pain Relief Spray",
      image: product8,
      price: "₹150",
      originalPrice: "₹220",
      discount: "32% off",
      rating: 4.5,
      reviews: 1600,
    },
    {
      id: 9,
      name: "Paracetamol",
      image: product9,
      price: "₹120",
      originalPrice: "₹200",
      discount: "40% off",
      rating: 4.2,
      reviews: 1250,
    },
    {
      id: 10,
      name: "Vitamin C Tablets",
      image: product1,
      price: "₹120",
      originalPrice: "₹180",
      discount: "33% off",
      rating: 4.0,
      reviews: 980,
    },
    {
      id: 11,
      name: "Cough Syrup",
      image: product1,
      price: "₹80",
      originalPrice: "₹150",
      discount: "47% off",
      rating: 3.9,
      reviews: 700,
    },
    {
      id: 12,
      name: "Pain Relief Spray",
      image: product2,
      price: "₹150",
      originalPrice: "₹220",
      discount: "32% off",
      rating: 4.5,
      reviews: 1600,
    },
    {
      id: 13,
      name: "Paracetamol",
      image: product4,
      price: "₹120",
      originalPrice: "₹200",
      discount: "40% off",
      rating: 4.2,
      reviews: 1250,
    },
    {
      id: 14,
      name: "Vitamin C Tablets",
      image: product3,
      price: "₹120",
      originalPrice: "₹180",
      discount: "33% off",
      rating: 4.0,
      reviews: 980,
    },
    {
      id: 15,
      name: "Cough Syrup",
      image: product2,
      price: "₹80",
      originalPrice: "₹150",
      discount: "47% off",
      rating: 3.9,
      reviews: 700,
    },
    {
      id: 16,
      name: "Pain Relief Spray",
      image: product1,
      price: "₹150",
      originalPrice: "₹220",
      discount: "32% off",
      rating: 4.5,
      reviews: 1600,
    },
  ];

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
      }`}
    >
      {/* Heading Section */}
      <div className="py-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Best Deals on Medicines
        </h1>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            placeholder="Search Medicines"
            className={`px-4 py-2 w-96 rounded-md border-2 ${
              theme === "dark"
                ? "text-black border-yellow-400 focus:ring-yellow-300"
                : "text-black border-blue-400 focus:ring-blue-300"
            } focus:outline-none focus:ring-2`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`border p-4 rounded-lg shadow-md ${
                theme === "dark"
                  ? "bg-black border-gray-700 text-white"
                  : "bg-gray-100 border-gray-300 text-black"
              }`}
            >
              {/* Product Image */}
              <div className="w-full h-40 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              {/* Product Title */}
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center space-x-1 mt-1">
                <div className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-sm flex items-center">
                  {product.rating} <FaStar className="ml-1 text-xs" />
                </div>
                <p className="text-gray-400 text-sm">({product.reviews})</p>
              </div>

              {/* Pricing */}
              <div className="flex items-center space-x-2 mt-2">
                <p className="text-green-400 font-bold text-lg">
                  {product.price}
                </p>
                <p className="text-gray-500 line-through text-sm">
                  {product.originalPrice}
                </p>
                <p className="text-green-500 text-sm font-semibold">
                  {product.discount}
                </p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addItemToCart(product)}
                className="bg-yellow-500 text-black w-full py-2 mt-3 rounded-md font-semibold hover:bg-yellow-400"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
