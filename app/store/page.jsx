"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { FaStar, FaShoppingCart, FaCreditCard } from "react-icons/fa"; // Import the cart and buy icons
import ThemeContext from "../ThemeContext";
import UserContext from "../UserContext";
import product1 from "../assets/store1.jpg";
import product2 from "../assets/store2.jpg";
import product3 from "../assets/store3.jpg";
import product4 from "../assets/store4.jpg";
import product5 from "../assets/store5.jpg";
import product6 from "../assets/store6.jpg";
import product7 from "../assets/store7.jpg";
import product8 from "../assets/store8.jpg";
import product9 from "../assets/store9.jpg";

const Store = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      description: "Effective relief for fever and mild to moderate pain.",
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
      description: "Boost your immune system with these Vitamin C tablets.",
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
      description: "Soothe your throat and alleviate cough with this syrup.",
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
      description: "Quick relief from muscle and joint pain with this spray.",
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
      description: "Effective relief for fever and mild to moderate pain.",
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
      description: "Boost your immune system with these Vitamin C tablets.",
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
      description: "Soothe your throat and alleviate cough with this syrup.",
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
      description: "Quick relief from muscle and joint pain with this spray.",
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
      description: "Effective relief for fever and mild to moderate pain.",
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
      description: "Boost your immune system with these Vitamin C tablets.",
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
      description: "Soothe your throat and alleviate cough with this syrup.",
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
      description: "Quick relief from muscle and joint pain with this spray.",
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
      description: "Effective relief for fever and mild to moderate pain.",
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
      description: "Boost your immune system with these Vitamin C tablets.",
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
      description: "Soothe your throat and alleviate cough with this syrup.",
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
      description: "Quick relief from muscle and joint pain with this spray.",
    },
  ];

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addItemToCart(product);
    setSelectedProduct(null); // Close modal
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(null); // Close modal
    // Add buy now functionality here
  };

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
              className={`border p-4 rounded-lg shadow-md cursor-pointer ${
                theme === "dark"
                  ? "bg-black border-gray-700 text-white"
                  : "bg-gray-100 border-gray-300 text-black"
              }`}
              onClick={() => setSelectedProduct(product)}
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
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className={`bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-1/2 w-full h-64 relative mb-4 md:mb-0">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              {/* Details Section */}
              <div className="md:w-1/2 w-full md:pl-6">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center space-x-1 mb-2">
                  <div className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-sm flex items-center">
                    {selectedProduct.rating} <FaStar className="ml-1 text-xs" />
                  </div>
                  <p className="text-gray-400 text-sm">
                    ({selectedProduct.reviews} reviews)
                  </p>
                </div>
                <p className="text-lg font-semibold mb-2">
                  {selectedProduct.price}{" "}
                  <span className="text-gray-500 line-through text-sm">
                    {selectedProduct.originalPrice}
                  </span>{" "}
                  <span className="text-green-500 text-sm font-semibold">
                    {selectedProduct.discount}
                  </span>
                </p>
                <p className="mb-4">{selectedProduct.description}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md flex items-center"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                  <button
                    onClick={() => handleBuyNow(selectedProduct)}
                    className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md flex items-center"
                  >
                    <FaCreditCard className="mr-2" /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
