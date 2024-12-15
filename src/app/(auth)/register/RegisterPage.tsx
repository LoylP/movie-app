"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { BiHomeAlt, BiCameraMovie } from "react-icons/bi";
import axios from "axios";
import { useRouter } from 'next/navigation'; 

// func to register user using username and password role_id and age using axios
const registerUser = async (username, email, password, confirmPassword) => {
  try {
    const response = await axios.post("http://localhost:8000/users/register", {
      username,
      email,
      password,
      confirm_password: confirmPassword,
    });
    document.cookie = `token=${response.data.access_token}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/`;
    return true
  } catch (error) {
    console.error(error);
    return false
  }
};

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize useRouter hook

  return (
    <div className="min-h-screen w-full flex">
      {/* Home Logo */}
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center group hover:scale-105 transition-transform duration-200">
          <BiHomeAlt className="text-4xl text-red-600 group-hover:text-yellow-400 mr-2 transition-colors duration-200" />
          <span className="text-xl text-white font-semibold group-hover:text-yellow-400 transition-colors duration-200">
            Home
          </span>
        </Link>
      </div>

      {/* Left Section - Movie Poster Backdrop */}
      <div className="hidden lg:flex lg:w-2/5 relative">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/VN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg')",
          }}
        />

        {/* Overlay Text */}
        <div className="relative z-20 p-12 flex flex-col justify-center">
          <BiCameraMovie className="text-6xl text-red-600 mb-6" />

          <div className="flex items-center justify-center mb-4">
            <h1 className="text-5xl font-bold text-white mr-4">Welcome to</h1>
            <div className="font-bold rounded-lg flex items-center">
              <span className="ml-1 text-green-600 font-bold text-6xl italic transform -skew-x-10 inline-block drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                M
              </span>
              <span className="text-4xl text-amber-600 py-1 mr-1">Film</span>
            </div>
          </div>

          <p className="text-xl text-gray-300">
            Join us to discover thousands of movies and TV shows. Sign up now!
          </p>
        </div>
      </div>

      {/* Right Section - Register Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center bg-gray-900 p-8">
        {/* Top-right corner logo */}
        <div className="absolute top-4 right-4 flex items-center font-bold">
            <Link href="/" className="flex items-center cursor-pointer">
                <span className="ml-1 text-green-600 font-bold text-3xl italic transform -skew-x-10 inline-block drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    M
                </span>
                <span className="text-lg text-amber-600 py-1 mr-1">Film</span>
            </Link>
        </div>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <BiCameraMovie className="mx-auto text-5xl text-red-600 lg:hidden" />
            <h2 className="mt-6 text-3xl font-bold text-white">Create your account</h2>
            <p className="mt-2 text-gray-400">Please fill in the details to register</p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Username Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaUserAlt className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition duration-200"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaEnvelope className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition duration-200"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition duration-200"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                onClick={async (e) => {
                  e.preventDefault();
                  const success = await registerUser(userName, email, password, confirmPassword);
                  if (success) {
                    router.back();
                  } else {
                    alert('Login failed. Please check your credentials.');
                  }
                }}
              >
                Sign up
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-red-600 hover:text-red-500 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
