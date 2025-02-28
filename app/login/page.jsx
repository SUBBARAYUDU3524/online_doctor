"use client"; // Mark this component as a client component

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";
import { motion } from "framer-motion";
import login from "../assets/home1.jpg";
import ThemeContext from "../ThemeContext";
import { auth } from "../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig"; // Import Firebase Firestore

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const storeToken = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const doctorDocRef = doc(db, "doctors", uid);

    const userDocSnap = await getDoc(userDocRef);
    const doctorDocSnap = await getDoc(doctorDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const token = userData.uid;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userType", "user");
    } else if (doctorDocSnap.exists()) {
      const doctorData = doctorDocSnap.data();
      const token = doctorData.uid;
      localStorage.setItem("doctorToken", token);
      localStorage.setItem("userType", "doctor");
    } else {
      console.error("No such document!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      await storeToken(uid);
      toast.success("Login successful! Redirecting...");
      router.push("/"); // Redirect to dashboard or another page after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const uid = userCredential.user.uid;
      await storeToken(uid);
      toast.success("Login successful! Redirecting...");
      router.push("/"); // Redirect after successful Google sign-in
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        {/* SEO and Meta Tags */}
        <title>
          ONLINE DOCTOR | Login - Access Your Account for Web & App Services
        </title>
        {/* Add other SEO/meta tags here */}
      </Head>

      <div
        className={`flex flex-col md:flex-row min-h-screen items-center justify-center  ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
        }`}
      >
        <Toaster /> {/* Add Toaster to render notifications */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className={`px-4 mt-10 sm:px-6 md:px-10  shadow-lg lg:py-10  ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex flex-col md:flex-row md:p-10 items-center lg:ml-6 lg:px-8">
            {/* Left Side Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="w-full md:w-1/2 h-[520px] flex justify-center items-center"
            >
              <Image
                src={login}
                alt="About ONLINE DOCTOR"
                width={500}
                height={520}
                className="w-full h-full  shadow-lg object-cover"
              />
            </motion.div>

            {/* Form Container */}
            <motion.div
              className={`w-full md:w-1/2 h-[520px] p-8  shadow-lg flex flex-col justify-center ${
                theme === "dark"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-black"
              }`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-center mb-6 ">Login</h1>
              <form
                onSubmit={handleLogin}
                className="flex flex-col justify-center"
              >
                <div className="mb-4">
                  <label className="block  text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block  text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm text-center mb-4">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white  py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
              <hr className="my-6 border-gray-300" />
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full  py-2 rounded-md border border-gray-300 flex items-center justify-center "
                  disabled={isLoading} // Disable button when loading
                >
                  <Image
                    src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                    alt="Google Icon"
                    className="w-6 h-6 mr-8"
                    width={24}
                    height={24}
                  />
                  {isLoading ? "Signing in..." : "Sign In with Google"}
                </button>
              </div>
              <p className="text-center ">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.section>
        {/* Image Container */}
      </div>
    </>
  );
}
