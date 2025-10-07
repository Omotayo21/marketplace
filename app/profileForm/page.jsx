"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  updateProfile,
  uploadImage,
  getCurrentUser,
  getProfile,
} from "../../lib/supabase";
import Header from "../_components/Header";
import { toast } from "react-hot-toast";

export default function ProfileForm() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    brand: "",
    short_description: "",
    contact_info: {
      whatsapp: "",
      instagram: "",
      snapchat: "",
      twitter: "",
      email: "",
    },
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }

    setUser(currentUser);

    // Fetch existing profile
    const { data: profileData } = await getProfile(currentUser.id);
    if (profileData) {
      setProfile(profileData);
      setFormData({
        name: profileData.name || "",
        location: profileData.location || "",
        brand: profileData.brand || "",
        short_description: profileData.short_description || "",
        contact_info: profileData.contact_info || {
          whatsapp: "",
          instagram: "",
          snapchat: "",
          twitter: "",
          email: "",
        },
      });
      setImagePreview(profileData.profile_picture || "");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    let updates = { ...formData };

    // Upload profile picture if selected
    if (profileImage) {
      const { data: uploadData, error: uploadError } = await uploadImage(
        profileImage
      );
      if (uploadError) {
        toast.error("Error uploading image");
        setLoading(false);
        return;
      }
      updates.profile_picture = uploadData.publicUrl;
    }

    const { error } = await updateProfile(user.id, updates);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated successfully!");
      router.push("/home"); // or wherever you want to redirect
    }
    setLoading(false);
  };

  // Keep all your JSX the same

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800  mb-3">
              Profile Settings
            </h1>
            <p className="text-gray-600  text-lg">
              Update your personal information and preferences
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 ">
            {/* Profile Picture Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 bg-[#3a1e9d] text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200"
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
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-gray-600  text-sm mt-3">
                Click the camera icon to upload a profile picture
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium  text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3  rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50  hover:bg-white text-black"
                />
              </div>

              {/* Location Input */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700  mb-2"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Where are you located?"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 text-black  rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50  hover:bg-white"
                />
              </div>

              {/* Brand Input (Conditional for Sellers) */}
              {profile?.role === "seller" && (
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700  mb-2"
                  >
                    Brand Name *
                  </label>
                  <input
                    id="brand"
                    type="text"
                    placeholder="Your brand or business name"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3  rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50  text-black"
                  />
                </div>
              )}

              {/* Description Textarea */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium  text-gray-700 mb-2"
                >
                  About Me
                </label>
                <textarea
                  id="description"
                  placeholder="Tell us a bit about yourself..."
                  value={formData.short_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      short_description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50  text-black resize-none"
                />
                <p className="text-gray-500 text-sm mt-1 ">
                  {formData.short_description.length}/500 characters
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Contact Information *
                </label>

                <div className="space-y-4">
                  {/* WhatsApp */}
                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-sm text-gray-600 mb-2"
                    >
                      WhatsApp Number
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.contact_info?.whatsapp || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact_info: {
                            ...formData.contact_info,
                            whatsapp: e.target.value,
                          },
                        })
                      }
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50"
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label
                      htmlFor="instagram"
                      className="block text-sm text-gray-600 mb-2"
                    >
                      Instagram Username
                    </label>
                    <input
                      id="instagram"
                      type="text"
                      placeholder="@username"
                      value={formData.contact_info?.instagram || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact_info: {
                            ...formData.contact_info,
                            instagram: e.target.value,
                          },
                        })
                      }
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50"
                    />
                  </div>

                  {/* Snapchat */}
                  <div>
                    <label
                      htmlFor="snapchat"
                      className="block text-sm text-gray-600 mb-2"
                    >
                      Snapchat Username
                    </label>
                    <input
                      id="snapchat"
                      type="text"
                      placeholder="username"
                      value={formData.contact_info?.snapchat || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact_info: {
                            ...formData.contact_info,
                            snapchat: e.target.value,
                          },
                        })
                      }
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50"
                    />
                  </div>

                  {/* Twitter */}
                  <div>
                    <label
                      htmlFor="twitter"
                      className="block text-sm text-gray-600 mb-2"
                    >
                      Twitter Username
                    </label>
                    <input
                      id="twitter"
                      type="text"
                      placeholder="@username"
                      value={formData.contact_info?.twitter || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact_info: {
                            ...formData.contact_info,
                            twitter: e.target.value,
                          },
                        })
                      }
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-600 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.contact_info?.email || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact_info: {
                            ...formData.contact_info,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a1e9d] focus:border-transparent transition-all duration-200 bg-gray-50"
                    />
                  </div>
                </div>

                <p className="text-gray-500 text-sm mt-3">
                  Provide at least one contact method so buyers can reach you
                </p>
              </div>
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3a1e9d] text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                      Updating Profile...
                    </div>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50  rounded-xl border border-blue-100">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-blue-700 text-sm">
                  Your profile information helps others get to know you better.
                  Fields marked with * are required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
