"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProduct, getCurrentUser } from "../../../lib/supabase";
import Link from "next/link";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import { toast } from "react-hot-toast";
import FavoriteButton from "../../_components/FavoriteButton";
import { FaCamera, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const productId = params.id; // Get ID from URL params

  useEffect(() => {
    fetchUser();
    if (productId) {
      fetchProduct();
    }
  }, [productId]);
  const fetchUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };
  const fetchProduct = async () => {
    setLoading(true);
    const { data, error } = await getProduct(productId);

    if (error) {
      toast.error("Error loading product");
      setLoading(false);
      return;
    }

    if (data) setProduct(data);
    setLoading(false);
  };

  const handleContactSeller = () => {
    if (product?.profiles?.id) {
      router.push(`/seller/${product.profiles.id}`);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-24 h-24 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/home"
              className="bg-[#3a1e9d] text-white px-6 py-3 rounded-xl hover:bg-[#3a1e9d] transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </>
    );
  }


  // Keep your JSX but replace the contact info section and add social links display

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link
              href="/"
              className="hover:text-[#3a1e9d] transition-colors duration-200"
            >
              Home
            </Link>
            <span>›</span>
            <Link
              href="/products"
              className="hover:text-[#3a1e9d] transition-colors duration-200"
            >
              Products
            </Link>
            <span>›</span>
            <span className="text-gray-800  font-medium truncate">
              {product.title}
            </span>
          </nav>

          {/* Main Content */}
          <div className="bg-white  rounded-2xl shadow-2xl overflow-hidden ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative bg-gray-100  rounded-2xl overflow-hidden aspect-square">
                  {!imageError ? (
                    <img
                      src={product.image_url || " "}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10">
                    <FavoriteButton
                      userId={user?.id}
                      productId={product.id}
                      size="large"
                    />
                  </div>
                  {/* Price Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    ${parseFloat(product.price).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Title and Category */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-800  mb-2">
                    {product.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="bg-blue-100 text-[#3a1e9d] px-3 py-1 rounded-full">
                      {product.categories?.name || "Uncategorized"}
                    </span>
                    <span>•</span>
                    <span>Listed recently</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800  mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600  leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

               

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleContactSeller}
                    className="flex-1 bg-[#3a1e9d] text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Contact Seller
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-none transition-colors duration-200">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="border-t border-gray-200 bg-gray-50  p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 0 mb-6">
                  Seller Information
                </h2>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 0">
                  <div className="flex items-start space-x-6">
                    {/* Seller Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                        {product.profiles?.profile_picture ? (
                          <img
                            src={product.profiles.profile_picture}
                            alt={product.profiles.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg
                            className="w-10 h-10 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Seller Details */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-800  mb-2">
                          Seller Details
                        </h3>
                        <div className="space-y-2">
                          <p className="flex items-center text-gray-600 ">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-400"
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
                            <strong>Name:</strong>{" "}
                            {product.profiles?.name || "Not provided"}
                          </p>
                          {product.profiles?.brand && (
                            <p className="flex items-center text-gray-600 ">
                              <svg
                                className="w-4 h-4 mr-2 text-gray-400 "
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                              <strong>Brand:</strong> {product.profiles.brand}
                            </p>
                          )}
                          {product.profiles?.location && (
                            <p className="flex items-center text-gray-600 ">
                              <svg
                                className="w-4 h-4 mr-2 text-gray-400 "
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
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <strong>Location:</strong>{" "}
                              {product.profiles.location}
                            </p>
                          )}
                          {product.profiles?.contact_info?.email && (
                            <p className="flex items-center text-gray-600 ">
                              <svg
                                className="w-4 h-4 mr-2 text-gray-400 "
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <strong>Email:</strong>{" "}
                              {product.profiles.contact_info.email}
                            </p>
                          )}
                          {product.profiles?.contact_info?.whatsapp && (
                            <p className="flex items-center text-gray-600 ">
                              <FaPhone className="w-4 h-4 mr-2 text-gray-400 " />
                              <strong>Whatsapp:</strong>{" "}
                              {product.profiles.contact_info.whatsapp}
                            </p>
                          )}
                          {product.profiles?.contact_info?.snapchat && (
                            <p className="flex items-center text-gray-600 ">
                              👻
                              <strong>Snapchat:</strong>{" "}
                              {product.profiles.contact_info.snapchat}
                            </p>
                          )}
                          {product.profiles?.contact_info?.instagram && (
                            <p className="flex items-center text-gray-600 ">
                              <FaInstagram className="w-4 h-4 mr-2 text-gray-400 " />
                              <strong>Instagram: </strong>
                              {"   "}
                              {product.profiles.contact_info.instagram}
                            </p>
                          )}
                          {product.profiles?.contact_info?.twitter && (
                            <p className="flex items-center text-gray-600 ">
                              <FaTwitter className="w-4 h-4 mr-2 text-gray-400 " />
                              <strong>Twitter:</strong>{" "}
                              {product.profiles.contact_info.twitter}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800  mb-2">
                          About Seller
                        </h3>
                        <p className="text-gray-600  leading-relaxed">
                          {product.profiles?.short_description ||
                            "No description provided."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* View Seller Profile Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800  mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Placeholder for related products */}
              <div className="text-center py-12 text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-300"
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
                <p>More products coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
