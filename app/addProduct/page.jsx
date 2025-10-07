"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  addProduct,
  uploadImage,
  getCategories,
  getCurrentUser,
  getProfile,
} from "../../lib/supabase";
import Header from "../_components/Header";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Image from "next/image";
export default function AddProduct() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUserAndFetchData();
  }, []);

  const checkUserAndFetchData = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      toast.error("Please login to add products");
      router.push("/login");
      return;
    }

    const { data: profileData } = await getProfile(currentUser.id);
    if (!profileData || profileData.role !== "seller") {
      toast.error("Only sellers can add products");
      router.push("/home");
      return;
    }

    setUser(currentUser);
    setProfile(profileData);
    fetchCategories();
  };

  const fetchCategories = async () => {
    const { data } = await getCategories();
    if (data) setCategories(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    // Upload image first
    let imageUrl = "";
    if (image) {
      const { data: uploadData, error: uploadError } = await uploadImage(image);
      if (uploadError) {
        toast.error("Error uploading image");
        setLoading(false);
        return;
      }
      imageUrl = uploadData.publicUrl;
    }

    // Add product
    const { error } = await addProduct({
      ...formData,
      seller_id: user.id,
      image_url: imageUrl,
      price: parseFloat(formData.price),
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Product added successfully!");
      setFormData({ title: "", description: "", price: "", category_id: "" });
      setImage(null);
      setImagePreview("");
      document.getElementById("product-image").value = "";

   
      router.push("/dashboard");
    }
    setLoading(false);
  };

  // Keep all your JSX the same

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800  mb-3">
              Add New Product
            </h1>
            <p className="text-gray-600  text-lg">
              List your product and reach potential buyers
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700  mb-4 text-center">
                  Product Image *
                </label>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50  flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer overflow-hidden">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Product preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <svg
                            className="w-12 h-12 text-gray-400  mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-gray-500  text-sm">
                            Click to upload image
                          </span>
                          <span className="text-gray-400  text-xs">
                            PNG, JPG up to 5MB
                          </span>
                        </>
                      )}
                    </div>
                    <input
                      id="product-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview("");
                          document.getElementById("product-image").value = "";
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium  text-gray-700 mb-2"
                >
                  Product Title *
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., Vintage Leather Jacket, Smartphone X Pro"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full text-black  px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1a9d] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Price and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="block  text-sm font-medium text-gray-700 mb-2"
                  >
                    Price ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 dark:text-gray-200 text-gray-500">
                      $
                    </span>
                    <input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      step="0.01"
                      min="0"
                      required
                      className="w-full  text-black pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1a9d] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium  text-gray-700 mb-2"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category_id}
                    onChange={(e) =>
                      setFormData({ ...formData, category_id: e.target.value })
                    }
                    required
                    className="w-full  text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1a9d] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm  font-medium text-gray-700 mb-2"
                >
                  Product Description *
                </label>
                <textarea
                  id="description"
                  placeholder="Describe your product in detail... Include features, condition, size, color, etc."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  required
                  className="w-full  text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1a9d] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                />
                <p className="text-gray-500 dark:text-white text-sm mt-1">
                  {formData.description.length}/1000 characters
                </p>
              </div>

              {/* Contact Information */}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3a1a9d] text-white py-3 rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                      Adding Product...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaPlus className="w-5 h-5 mr-2" />
                      Add Product
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
