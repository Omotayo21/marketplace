{/*}
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // Public routes (accessible without login)
  const publicRoutes = ["/login", "/signup", "/reset-password", "/"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If not logged in and trying to access protected route
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in and trying to access login/signup, redirect to home
  if (session && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
*/}




export const signup = async (email, password) => {
  const {data, error} = await supabase.auth.signupwithpassword({email, password})
  return {data, error}
}

export const createProfile = async (userId, profileData) => {
  const {data, error} = await supabase.from("profiles").insert({
    id: userId,
    ...profileData
  })
  return {data, error};
}
 export const getProfile = async (userId) => {
  const {data, error} = await supabase.from("profiles").select("*").eq("id", userId).single()
  return {data, error} 
 }