"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getProfile,
  getSellerProducts,
  getCurrentUser,
} from "../../lib/supabase";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Ratings from "../_components/Ratings";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");
  const router = useRouter();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);

    // Get current logged-in user
    const user = await getCurrentUser();
    if (!user) {
      router.push("/login");
      return;
    }

    setCurrentUser(user);

    // Fetch profile
    const { data: profileData, error: profileError } = await getProfile(
      user.id
    );
    if (profileError) {
      console.error("Error fetching profile:", profileError);
      setLoading(false);
      return;
    }

    setProfile(profileData);

    // Fetch products if user is a seller
    if (profileData?.role === "seller") {
      const { data: productsData } = await getSellerProducts(user.id);
      setProducts(productsData || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3a1e9d]"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Please complete your profile setup.
          </p>
          <Link
            href="/profile-form"
            className="bg-[#3a1e9d] text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
          >
            Set Up Profile
          </Link>
        </div>
      </div>
    );
  }

  // Extract contact info from JSONB
  const contactInfo = profile.contact_info || {};

  const socialLinks = [
    {
      platform: "whatsapp",
      url: contactInfo.whatsapp
        ? `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`
        : null,
      icon: "📱",
      display: contactInfo.whatsapp,
    },
    {
      platform: "instagram",
      url: contactInfo.instagram
        ? `https://instagram.com/${contactInfo.instagram.replace("@", "")}`
        : null,
      icon: "📸",
      display: contactInfo.instagram,
    },
    {
      platform: "snapchat",
      url: contactInfo.snapchat
        ? `https://snapchat.com/add/${contactInfo.snapchat.replace("@", "")}`
        : null,
      icon: "👻",
      display: contactInfo.snapchat,
    },
    {
      platform: "twitter",
      url: contactInfo.twitter
        ? `https://twitter.com/${contactInfo.twitter.replace("@", "")}`
        : null,
      icon: "🐦",
      display: contactInfo.twitter,
    },
    {
      platform: "email",
      url: contactInfo.email ? `mailto:${contactInfo.email}` : null,
      icon: "✉️",
      display: contactInfo.email,
    },
  ].filter((link) => link.url);

  // Keep all your JSX but update the social links rendering

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ">
        {/* Profile Header */}
        <div className="bg-white  shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-2xl">
                  {profile.profile_picture ? (
                    <img
                      src={profile.profile_picture}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                {profile.role === "seller" && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    SELLER
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                      {profile.name}
                    </h1>
                    {profile.brand && (
                      <p className="text-xl text-blue-600 font-semibold mb-2">
                        {profile.brand}
                      </p>
                    )}
                    {profile.location && (
                      <p className="text-gray-600  flex items-center justify-center md:justify-start">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        {profile.location}
                      </p>
                    )}
                  </div>

                  {/* Social Links */}
                  {socialLinks.length > 0 && (
                    <div className="flex space-x-3 justify-center md:justify-start mt-4 md:mt-0">
                      {socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 text-lg"
                          title={link.platform}
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Short Description */}
                {profile.short_description && (
                  <p className="text-gray-700  text-lg leading-relaxed max-w-3xl">
                    {profile.short_description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <div className="bg-white  rounded-2xl shadow-lg mb-8 overflow-hidden">
            <div className="flex border-b border-gray-200 ">
              <button
                onClick={() => setActiveTab("products")}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                  activeTab === "products"
                    ? "text-[#3a1e9d] border-b-2 border-[#3a1e9d]"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                  activeTab === "about"
                    ? "text-[#3a1e9d] border-b-2 border-[#3a1e9d]"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                  activeTab === "contact"
                    ? "text-[#3a1e9d] border-b-2 border-[#3a1e9d]"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {/* Products Tab */}
            {activeTab === "products" && (
              <div>
                {products.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <svg
                      className="w-24 h-24 text-black mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      No Products Yet
                    </h3>
                    <p className="text-black mb-6">
                      {profile.role === "seller"
                        ? "This seller hasn't listed any products yet."
                        : "This user hasn't listed any products."}
                    </p>
                    {profile.role === "seller" && (
                      <Link
                        href="/add-product"
                        className="bg-[#3a1e9d] text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                      >
                        Add Your First Product
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white  rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300  overflow-hidden group"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image_url}
                            alt={product.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3">
                            <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              ${parseFloat(product.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800  mb-2 line-clamp-2 group-hover:text-[#3a1e9d] transition-colors duration-200">
                            {product.title}
                          </h3>
                          <p className="text-gray-600  text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <Link
                            href={`/product/${product.id}`}
                            className="w-full bg-[#3a1e9d] text-white py-2 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <div className="bg-white  text-black rounded-2xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Full Name
                        </label>
                        <p className="text-gray-800 font-medium">
                          {profile.name}
                        </p>
                      </div>
                      {profile.brand && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Brand/Business
                          </label>
                          <p className="text-gray-800 font-medium">
                            {profile.brand}
                          </p>
                        </div>
                      )}
                      {profile.location && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Location
                          </label>
                          <p className="text-gray-800 font-medium">
                            {profile.location}
                          </p>
                        </div>
                      )}
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Role
                        </label>
                        <p className="text-gray-800 font-medium capitalize">
                          {profile.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                      About Me
                    </h3>
                    {profile.short_description ? (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {profile.short_description}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic">
                        No description provided.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="bg-white  rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Contact Information
                </h3>
                <p>Click on the link to connect</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-[#3a1e9d]  rounded-xl hover:border-[#3a1e9d] hover:bg-gray-200 transition-all duration-200 group"
                    >
                      <span className="text-2xl mr-4">{link.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800 capitalize">
                          {link.platform}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {link.platform === "email"
                            ? profile.email
                            : link.platform === "whatsapp"
                            ? profile.whatsapp_number
                            //: link.platform === "instagram"
                            //? `@${profile.ig_username}`
                            //: link.platform === "twitter"
                            //? `@${profile.twitter_username}`
                            : link.platform === "snapchat"
                            ? profile.snapchat_username
                            : ""}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 ml-auto group-hover:text-[#3a1e9d] transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ))}
                </div>

                {socialLinks.length === 0 && (
                  <div className="text-center py-12">
                    <svg
                      className="w-16 h-16 text-black mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <p className="text-black">
                      No contact information available.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Ratings />
      </div>
      <Footer />
    </>
  );
}
