"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Products() {
  const items = [
    {
      img: "/shoe.webp",
      name: "stylish sneakers",
      price: 34000,
      seller: "SBL Store",
      category: "footwear",
      avatar: "/profile-icon.jpg",
    },
    {
      img: "/cocooil.jpg",
      name: "Cocooil",
      price: 21000,
      seller: "SBL Store",
      category: "skincare",
      avatar: "/profile-icon.jpg",
    },
    {
      img: "/watch.jpg",
      name: "Rolex Amg 60",
      price: 230000,
      seller: "SBL Store",
      category: "accessories",
      avatar: "/profile-icon.jpg",
    },
    {
      img: "/nike.jpg",
      name: "nike airforce",
      price: 55000,
      seller: "SBL Store",
      category: "footwear",
      avatar: "/profile-icon.jpg",
    },
  ];
  return (
    <div className="flex flex-col items-center gap-y-5">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-back-10 dark:bg-gray-800 p-4 mx-auto max-w-[320px] rounded-xl"
        >
          <div>
            <Image
              src={item.img}
              width={300}
              height={140}
              className="rounded-xl"
              alt="product image"
            />
          </div>
          <div className=" mt-3">
            <h3 className="font-semibold text-2xl capitalize dark:text-white text-back-90">{item.name}</h3>
            <p className=" text-gold-90 dark:text-gold-10 font-bold text-2xl mt-2 mb-3">₦{item.price}</p>
            <Link
              href={"/"}
              className=" hover:underline py-2 px-4 rounded-lg capitalize text-lav-10 bg-gray-200 dark:bg-gray-600 dark:text-lav-90"
            >
              {item.category}
            </Link>
            <div className=" flex items-center gap-x-2 mt-5">
              <Image
                src={item.avatar}
                width={30}
                height={30}
                alt="seller profile picture"
                className=" w-10 h-10 rounded-full"
              />
              <div>
                <p className=" font-bold">{item.seller}</p>
                <div className=" flex items-center">
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <Image key={index} alt="star icon" width={20} height={20} src={"/star.png"} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
