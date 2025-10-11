"use client";
import React, { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import LogoLight from "@/public/agora-logo-light.png"
import LogoLight from "../../public/agora-logo-light.png";
import { getCurrentUser, getProfile } from "../../lib/supabase";


import { FaHeart } from "react-icons/fa";

export default function Header() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

const router = useRouter();
  useEffect(() => {
    fetchProfileData();
  }, []);
  const fetchProfileData = async () => {
   
    // Get current logged-in user
    const user = await getCurrentUser();
    if (!user) {
      router.push("/login");
      return;
    }

    // Fetch profile
    const { data: profileData, error: profileError } = await getProfile(
      user.id
    );
    if (profileError) {
      console.error("Error fetching profile:", profileError);
   
      return;
    }

    setProfile(profileData);
    console.log(profile)
  };
  return (
    <header className=" px-4 py-4 sticky z-40 shadow-lg w-full top-0 bg-[#3a1a9d]">
      <div className=" flex items-center justify-between">
        <div>
          
          <Link href={"/home"}>
            <Image src={LogoLight} alt="agora logo light" className=" w-32 " />
          </Link>
        </div>
        <div className=" flex items-center gap-x-[12px]">
        

          <Link href={"/dashboard"}>
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden">
            {profile?.profile_picture ? (
              <img
                src={profile.profile_picture}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-16 h-16 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
