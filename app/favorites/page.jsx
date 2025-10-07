"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getUserFavorites,
  getCurrentUser,
  removeFromFavorites,
} from "../../lib/supabase";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { FaHeart, FaTrash, FaArrowRight } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function FavoritesPage() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchFavorites();
  }, []);

  const checkAuthAndFetchFavorites = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      toast.error("Please login to view favorites");
      router.push("/login");
      return;
    }

    setUser(currentUser);
    await fetchFavorites(currentUser.id);
  };

  const fetchFavorites = async (userId) => {
    setLoading(true);
    const { data, error } = await getUserFavorites(userId);

    if (error) {
      toast.error("Error loading favorites");
    } else {
      setFavorites(data || []);
    }
    setLoading(false);
  };

  const handleRemoveFavorite = async (productId) => {
    if (!user) return;

    const { error } = await removeFromFavorites(user.id, productId);

    if (error) {
      toast.error("Error removing favorite");
    } else {
      setFavorites(favorites.filter((fav) => fav.product_id !== productId));
      toast.success("Removed from favorites");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3a1e9d]"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
                <FaHeart className="text-red-500 mr-3" />
                My Favorites
              </h1>
              <p className="text-gray-600">
                {favorites.length} {favorites.length === 1 ? "item" : "items"}{" "}
                saved
              </p>
            </div>
          </div>

          {/* Empty State */}
          {favorites.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <FaHeart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                No Favorites Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start adding products to your favorites to see them here
              </p>
              <Link
                href="/home"
                className="inline-flex items-center bg-[#3a1e9d] text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                Browse Products
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map(({ products: product, created_at }) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="absolute top-3 right-3 z-10 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors duration-200"
                    title="Remove from favorites"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>

                  {/* Product Image */}
                  <Link href={`/product/${product.id}`}>
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image_url || "/api/placeholder/300/200"}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#3a1e9d] transition-colors duration-200">
                        {product.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Seller Info */}
                      <div className="flex items-center text-sm text-gray-500 mb-3">
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
                      </div>

                      {/* Date Added */}
                      <p className="text-xs text-gray-400 mb-4">
                        Added {new Date(created_at).toLocaleDateString()}
                      </p>

                      {/* View Button */}
                      <div className="flex items-center justify-center text-[#3a1e9d] font-medium group-hover:underline">
                        View Details
                        <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
