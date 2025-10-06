// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gqfbydhezynnwocwcqut.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZmJ5ZGhlenlubndvY3djcXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjAwMTgsImV4cCI6MjA3NDAzNjAxOH0.Nzl-zuyRGlZNPk47LXNkjetRXXVTyz8ZYXAq15QSpDw";

export const supabase = createClient(supabaseUrl, supabaseKey);

// ============= AUTH FUNCTIONS =============

// Sign up with email
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

// Sign in with email
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

// Sign in with Google
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  return { data, error };
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Get current user
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
export const resetPassword = async (email) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
  });
};

// update password (after reset)
export const updatePassword = async (newPassword) => {
  return await supabase.auth.updateUser({ password: newPassword });
};
// ============= PROFILE FUNCTIONS =============

// Create user profile (after signup)
export const createProfile = async (userId, profileData) => {
  const { data, error } = await supabase.from("profiles").insert({
    id: userId,
    ...profileData,
  });
  return { data, error };
};

// Get user profile
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
};

// Update user profile
export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);
  return { data, error };
};

// Get seller profile with ratings
export const getSellerProfile = async (sellerId) => {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", sellerId)
    .eq("role", "seller")
    .single();

  if (profileError) return { data: null, error: profileError };

  const { data: ratings, error: ratingsError } = await supabase
    .from("ratings")
    .select("stars")
    .eq("seller_id", sellerId);

  const avgRating =
    ratings?.length > 0
      ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
      : 0;

  return {
    data: { ...profile, avgRating, totalRatings: ratings?.length || 0 },
    error: ratingsError,
  };
};

// ============= PRODUCT FUNCTIONS =============

// Get all products
export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      profiles:seller_id (name, brand, profile_picture),
      categories:category_id (name)
    `
    )
    .order("created_at", { ascending: false });
  return { data, error };
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      profiles:seller_id (name, brand, profile_picture),
      categories:category_id (name)
    `
    )
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });
  return { data, error };
};

// Get seller's products
export const getSellerProducts = async (sellerId) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories:category_id (name)
    `
    )
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });
  return { data, error };
};

// Add new product (sellers only)
export const addProduct = async (productData) => {
  const { data, error } = await supabase.from("products").insert(productData);
  return { data, error };
};

// Update product
export const updateProduct = async (productId, updates) => {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", productId);
  return { data, error };
};

// Delete product
export const deleteProduct = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);
  return { data, error };
};

// Get single product
export const getProduct = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      profiles:seller_id (*),
      categories:category_id (name)
    `
    )
    .eq("id", productId)
    .single();
  return { data, error };
};

// ============= CATEGORY FUNCTIONS =============

// Get all categories
export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error.message);
  }
  console.log("Fetched categories:", data);

  return { data, error };
};


// ============= RATING FUNCTIONS =============

// Add rating (buyers only)
export const addRating = async (ratingData) => {
  const { data, error } = await supabase.from("ratings").insert(ratingData);
  return { data, error };
};

// Get seller ratings
export const getSellerRatings = async (sellerId) => {
  const { data, error } = await supabase
    .from("ratings")
    .select(
      `
      *,
      profiles:buyer_id (name)
    `
    )
    .eq("seller_id", sellerId)
    .order("created_at", { ascending: false });
  return { data, error };
};

// Check if buyer already rated seller
export const hasUserRatedSeller = async (buyerId, sellerId) => {
  const { data, error } = await supabase
    .from("ratings")
    .select("id")
    .eq("buyer_id", buyerId)
    .eq("seller_id", sellerId)
    .single();

  return { hasRated: !!data, error };
};

// ============= FILE UPLOAD FUNCTIONS =============

// Upload image to Supabase Storage
export const uploadImage = async (file, bucket = "images") => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) return { data: null, error };

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return { data: { publicUrl, path: filePath }, error: null };
};

// Delete image from Supabase Storage
export const deleteImage = async (path, bucket = "images") => {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  return { error };
};


// Add these functions to your lib/supabase.js file

// ============= FAVORITES FUNCTIONS =============

// Add product to favorites
export const addToFavorites = async (userId, productId) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert({
      user_id: userId,
      product_id: productId
    })
  return { data, error }
}

// Remove product from favorites
export const removeFromFavorites = async (userId, productId) => {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)
  return { data, error }
}

// Check if product is in user's favorites
export const isProductFavorited = async (userId, productId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()
  
  return { isFavorited: !!data, error: error?.code !== 'PGRST116' ? error : null }
}

// Get user's favorite products
export const getUserFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      *,
      products!inner (
        *,
        profiles:seller_id (name, brand, profile_picture),
        categories:category_id (name)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// Toggle favorite (add if not favorited, remove if already favorited)
export const toggleFavorite = async (userId, productId) => {
  const { isFavorited } = await isProductFavorited(userId, productId)
  
  if (isFavorited) {
    return await removeFromFavorites(userId, productId)
  } else {
    return await addToFavorites(userId, productId)
  }
}