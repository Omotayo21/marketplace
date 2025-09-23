import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";
// import LogoLight from "@/public/agora-logo-light.png"
import LogoLight from "../../public/agora-logo-light.png";
import LogoDark from "../../public/agora-logo-dark.png";
import cartDark from "../../public/cart-dark.png";
import cartLight from "../../public/cart-light.png";
import profile from "../../public/profile-icon.jpg";

export default function Header() {
  return (
    <header className=" px-4 py-4 sticky shadow-lg w-full top-0 bg-white dark:bg-back-90">
      <div className=" flex items-center justify-between">
        <div>
          <Link href={"/"}>
            <Image
              src={LogoDark}
              alt="agora logo dark"
              className=" w-28 block dark:hidden"
            />
            <Image
              src={LogoLight}
              alt="agora logo light"
              className=" w-32 hidden dark:block"
            />
          </Link>
        </div>
        <div className=" flex items-center gap-x-[12px]">
          <ThemeToggle />
          <Link href={"/"}>
            <Image
              src={cartDark}
              alt="agora logo dark"
              className=" w-8 h-8 block dark:hidden"
            />
            <Image
              src={cartLight}
              alt="agora logo light"
              className=" w-8 h-8 hidden dark:block"
            />
          </Link>
          <Link href={"/"}>
            <Image
              src={profile}
              alt="profile icon"
              className=" border border-back-90 dark:border-white w-8 h-8 rounded-full"
            />
          </Link>
        </div>
      </div>
      <div className=" mt-4">
        <input
          type="text"
          placeholder="Search..."
          className=" px-4 w-full bg-transparent block outline-none border border-gray-400 dark:border-gray-400 rounded-full h-[40px]"
        />
      </div>
    </header>
  );
}
