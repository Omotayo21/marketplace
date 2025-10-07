"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  getProfile,
  getSellerProducts,
  signOut,
  deleteProduct,
} from "../../lib/supabase";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import {
  FaEdit,
  FaPlus,
  FaTrash,
  FaSignOutAlt,
  FaUser,
  FaHeart,
  FaBox,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import Image from "next/image";
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }

    setUser(currentUser);

    const { data: profileData } = await getProfile(currentUser.id);
    if (!profileData) {
      router.push("/role");
      return;
    }
    setProfile(profileData);

    if (profileData.role === "seller") {
      const { data: productsData } = await getSellerProducts(currentUser.id);
      setProducts(productsData || []);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Logged out successfully");
      router.push("/login");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await deleteProduct(productId);
    if (error) {
      toast.error("Error deleting product");
    } else {
      toast.success("Product deleted successfully");
      setProducts(products.filter((p) => p.id !== productId));
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
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                  {profile?.profile_picture ? (
                    <Image
                      src={profile.profile_picture}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Welcome back, {profile?.name || "User"}!
                  </h1>
                  <p className="text-gray-600 capitalize">
                    {profile?.role} Account
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors duration-200"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/profileForm"
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Edit Profile</p>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#3a1e9d] transition-colors">
                    Update Info
                  </h3>
                </div>
                <FaEdit className="text-3xl text-[#3a1e9d]" />
              </div>
            </Link>

            <Link
              href="/favorites"
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">My Favorites</p>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-500 transition-colors">
                    View Saved
                  </h3>
                </div>
                <FaHeart className="text-3xl text-red-500" />
              </div>
            </Link>

            {profile?.role === "seller" && (
              <Link
                href="/addProduct"
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Add Product</p>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                      List New Item
                    </h3>
                  </div>
                  <FaPlus className="text-3xl text-green-600" />
                </div>
              </Link>
            )}
          </div>

          {/* Seller Section */}
          {profile?.role === "seller" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaBox className="mr-3 text-[#3a1e9d]" />
                  My Products ({products.length})
                </h2>
                <Link
                  href="/add-product"
                  className="bg-[#3a1e9d] text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Add Product
                </Link>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <FaBox className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Products Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start selling by adding your first product
                  </p>
                  <Link
                    href="/add-product"
                    className="inline-flex items-center bg-[#3a1e9d] text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    Add Your First Product
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative">
                        <Image
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            ${parseFloat(product.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex space-x-2">
                          <Link
                            href={`/product/${product.id}`}
                            className="flex-1 bg-[#3a1e9d] text-white py-2 rounded-xl text-center hover:bg-blue-700 transition-colors text-sm"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Buyer Section */}
          {profile?.role === "buyer" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Buyer Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/favorites"
                  className="border border-gray-200 rounded-xl p-6 hover:border-[#3a1e9d] hover:shadow-md transition-all duration-200"
                >
                  <FaHeart className="text-3xl text-red-500 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    My Favorites
                  </h3>
                  <p className="text-gray-600 text-sm">
                    View all your saved products
                  </p>
                </Link>

                <Link
                  href="/home"
                  className="border border-gray-200 rounded-xl p-6 hover:border-[#3a1e9d] hover:shadow-md transition-all duration-200"
                >
                  <FaBox className="text-3xl text-[#3a1e9d] mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Browse Products
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Discover amazing items
                  </p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
