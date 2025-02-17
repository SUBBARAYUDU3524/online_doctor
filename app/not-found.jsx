// pages/404.js
"use client";
import Link from "next/link";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";

export default function Custom404() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen 
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <p className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go Back Home
        </p>
      </Link>
    </div>
  );
}
