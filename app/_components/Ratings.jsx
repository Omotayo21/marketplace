"use client";
import { useState, useEffect } from "react";
import { addRating, hasUserRatedSeller, getProfile } from "../../lib/supabase";
import { toast } from "react-hot-toast";

export default function RateSeller({ buyerId, sellerId, onRatingAdded }) {
  const [stars, setStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [canRate, setCanRate] = useState(false);

  useEffect(() => {
    checkRatingEligibility();
  }, [buyerId, sellerId]);

  const checkRatingEligibility = async () => {
    if (!buyerId || !sellerId) return;

    // Check if user already rated this seller
    const { hasRated: alreadyRated } = await hasUserRatedSeller(
      buyerId,
      sellerId
    );
    setHasRated(alreadyRated);

    // Check if user is a buyer (buyers can rate sellers)
    const { data: buyerProfile } = await getProfile(buyerId);
    const { data: sellerProfile } = await getProfile(sellerId);

    if (buyerProfile?.role === "buyer" && sellerProfile?.role === "seller") {
      setCanRate(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stars || !buyerId || !sellerId) return;

    setLoading(true);

    const { error } = await addRating({
      buyer_id: buyerId,
      seller_id: sellerId,
      stars,
    });

    if (error) {
      if (error.code === "23505") {
        toast.error("You have already rated this seller");
      } else {
        toast.error("Error submitting rating");
      }
    } else {
      toast.success("Thank you for your rating!");
      setHasRated(true);
      setShowRating(false);
      setStars(0);
      onRatingAdded && onRatingAdded();
    }
    setLoading(false);
  };

  // Don't show rating component if user can't rate or already rated
  if (!canRate || hasRated || buyerId === sellerId) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
      {!showRating ? (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Rate this Seller
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Share your experience with this seller
          </p>
          <button
            onClick={() => setShowRating(true)}
            className="bg-[#3a1e9d] text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
          >
            Leave a Rating
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            How was your experience?
          </h3>

          {/* Star Rating */}
          <div className="flex justify-center space-x-2 py-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setStars(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className={`text-3xl transition-all duration-200 transform hover:scale-110 ${
                  star <= (hoveredStar || stars)
                    ? "text-yellow-400 filter drop-shadow-sm"
                    : "text-gray-300"
                }`}
              >
                ⭐
              </button>
            ))}
          </div>

          {/* Rating Labels */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {stars === 0 && "Tap a star to rate"}
              {stars === 1 && "Poor"}
              {stars === 2 && "Fair"}
              {stars === 3 && "Good"}
              {stars === 4 && "Very Good"}
              {stars === 5 && "Excellent"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowRating(false);
                setStars(0);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!stars || loading}
              className="flex-1 bg-[#3a1e9d] text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  Submitting...
                </div>
              ) : (
                "Submit Rating"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Rating Guidelines */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Your honest feedback helps maintain a trustworthy community
        </p>
      </div>
    </div>
  );
}