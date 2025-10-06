"use client";
import { useState, useEffect } from "react";
import { toggleFavorite, isProductFavorited } from "../../lib/supabase";
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function FavoriteButton({
  userId,
  productId,
  size = "default",
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId && productId) {
      checkFavoriteStatus();
    }
  }, [userId, productId]);

  const checkFavoriteStatus = async () => {
    const { isFavorited: favStatus } = await isProductFavorited(
      userId,
      productId
    );
    setIsFavorited(favStatus);
  };

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("Please login to add favorites");
      return;
    }

    setLoading(true);
    const { error } = await toggleFavorite(userId, productId);

    if (error) {
      toast.error("Error updating favorites");
    } else {
      setIsFavorited(!isFavorited);
      toast.success(
        isFavorited ? "Removed from favorites" : "Added to favorites"
      );
    }
    setLoading(false);
  };

  const iconSize = size === "large" ? "w-6 h-6" : "w-5 h-5";

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 ${
        isFavorited ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      {loading ? (
        <div className="animate-spin">
          <svg className={iconSize} fill="none" viewBox="0 0 24 24">
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
        </div>
      ) : isFavorited ? (
        <FaHeart className={iconSize} />
      ) : (
        <FaRegHeart className={iconSize} />
      )}
    </button>
  );
}
