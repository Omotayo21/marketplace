"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProfile, getCurrentUser } from "../../lib/supabase";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function RoleSelection() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role || !user) return;

    setLoading(true);

    const { error } = await createProfile(user.id, { role });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Role selected successfully!");
      // Redirect based on role
      if (role === "seller") {
        router.push("/profileForm"); // Redirect to profile form for sellers
      } else {
        router.push("/home"); // Buyers go straight to home
      }
    }
    setLoading(false);
  };

  // Keep all your JSX the same

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#3a1e9d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800  mb-2">
              Choose Your Role
            </h1>
            <p className="text-gray-600 ">
              Select how you&apos;d like to use our platform
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white  rounded-2xl shadow-2xl p-8 ">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection Cards */}
              <div className="space-y-4">
                {/* Buyer Card */}
                <label className={`block cursor-pointer group`}>
                  <input
                    type="radio"
                    value="buyer"
                    checked={role === "buyer"}
                    onChange={(e) => setRole(e.target.value)}
                    className="hidden"
                  />
                  <div
                    className={`p-4 border-2 rounded-xl transition-all duration-200 group-hover:shadow-md ${
                      role === "buyer"
                        ? "border-blue-500 bg-blue-50 "
                        : "border-gray-200 bg-gray-50  "
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          role === "buyer"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <FaShoppingCart className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-semibold text-lg ${
                              role === "buyer"
                                ? "text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            Buyer
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              role === "buyer"
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300 group-hover:border-blue-300"
                            }`}
                          >
                            {role === "buyer" && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          Browse and purchase products from local sellers
                        </p>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Seller Card */}
                <label className={`block cursor-pointer group`}>
                  <input
                    type="radio"
                    value="seller"
                    checked={role === "seller"}
                    onChange={(e) => setRole(e.target.value)}
                    className="hidden"
                  />
                  <div
                    className={`p-4 border-2 rounded-xl transition-all duration-200 group-hover:shadow-md ${
                      role === "seller"
                        ? "border-green-500 bg-green-50 "
                        : "border-gray-200 bg-gray-50 "
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                          role === "seller"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-semibold text-lg ${
                              role === "seller"
                                ? "text-green-700"
                                : "text-gray-700"
                            }`}
                          >
                            Seller
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              role === "seller"
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300 group-hover:border-green-300"
                            }`}
                          >
                            {role === "seller" && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          List and sell your products to local buyers
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={!role || loading}
                className="w-full bg-[#3a1e9d] text-white py-3 rounded-xl font-medium  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Setting Up Your Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Continue
                    <FaArrowRight className="w-5 h-5 ml-2" />
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Need help choosing?{" "}
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Contact support
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
