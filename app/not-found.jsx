"use client";

import { FaArrowRight } from "react-icons/fa";
import Footer from "./_components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <section className="flex flex-row text-black justify-center items-center h-screen">
        <div className="flex flex-col gap-y-6 justify-center items-center ">
          <h1 className="text-7xl font-bold ">404</h1>
          <h2 className="font-normal text-6xl text-center">Page Not Found</h2>
          <p className="font-normal text-sm text-center">
            It seems this page slipped between the lines. Let&apos;s <br /> find
            our way back.
          </p>
          <button className="bg-[#3a1e9d] py-2 px-6 rounded-md w-[200px] h-[52px] text-white  flex flex-row  items-center gap-x-3">
            <Link href="/home" className="font-medium text-lg">Back To Home</Link>
            <FaArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}
