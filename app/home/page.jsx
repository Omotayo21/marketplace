"use client";
import { useState, useEffect } from "react";
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
  getCurrentUser,
} from "../../lib/supabase";
import Link from "next/link";
import { FaSearch, FaFrown, FaArrowRight } from "react-icons/fa";
import Header from "../_components/Header";
import FavoriteButton from "../_components/FavoriteButton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
const [user,setUser] = useState(null);
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUser()
  }, []);
const fetchUser = async () => {
  const currentUser = await getCurrentUser();
  setUser(currentUser);
};
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await getAllProducts();
    if (data) setProducts(data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await getCategories();
    if (data) setCategories(data);
  };

  const filterByCategory = async (categoryId) => {
    setLoading(true);
    const { data } = categoryId
      ? await getProductsByCategory(categoryId)
      : await getAllProducts();

    if (data) setProducts(data);
    setSelectedCategory(categoryId);
    setLoading(false);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Keep all your JSX the same

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold  text-gray-800 mb-3">
              Discover Products
            </h1>
            <p className="text-gray-600 text-lg">
              Find amazing items from local sellers
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white text-black  rounded-2xl shadow-lg p-6 mb-8  ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2">
                <div className="relative text-black">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3  text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a191d] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className=" flex gap-x-5 overflow-x-scroll mt-4 hide-horizontal-scrollbar">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className=" shrink-0 flex flex-col items-center"
                >
                  <button
                    onClick={() => filterByCategory(cat.id)}
                    className="p-2 bg-gray-200  text-black rounded-lg flex justify-center items-center"
                  >
                    <p className=" text-center capitalize font-medium mt-1">
                      {cat.name}
                    </p>
                  </button>
                </div>
              ))}
            </div>
            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                  {categories.find((cat) => cat.id === selectedCategory)?.name}
                  <button
                    onClick={() => filterByCategory("")}
                    className="ml-2 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-green-600"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 ">
                  Showing{" "}
                  <span className="font-semibold">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                  {selectedCategory &&
                    ` in ${
                      categories.find((cat) => cat.id === selectedCategory)
                        ?.name
                    }`}
                </p>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white  rounded-2xl shadow-lg border border-gray-100 ">
                  <FaFrown className="w-24 h-24 text-gray-300  mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700  mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 ">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white  rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300  overflow-hidden group"
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image_url || "/api/placeholder/300/200"}
                          alt={product.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Favorite Button - Top Right */}
                        <div className="absolute top-3 right-3 z-10">
                          <FavoriteButton
                            userId={user?.id}
                            productId={product.id}
                          />
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                            ${parseFloat(product.price).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 d mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                          {product.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Seller Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500  mb-4">
                          <span className="flex items-center">
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
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {product.profiles?.brand || product.profiles?.name}
                          </span>
                        </div>

                        {/* View Details Button */}
                        <Link
                          href={`/product/${product.id}`}
                          className="w-full bg-[#3a1a9d] text-white py-2 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center group/btn"
                        >
                          View Details
                          <FaArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Load More (Optional) */}
          {!loading && filteredProducts.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 font-medium">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
