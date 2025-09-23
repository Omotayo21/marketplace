import Image from "next/image";
import React from "react";

export default function CategoriesSlider() {
  const categories = [
    {
      name: "jeans",
      img: "/category.png",
    },
    {
      name: "skincare",
      img: "/category.png",
    },
    {
      name: "sportswear",
      img: "/category.png",
    },
    {
      name: "accessories",
      img: "/category.png",
    },
    {
      name: "footwear",
      img: "/category.png",
    },
    {
      name: "cosmetics",
      img: "/category.png",
    },
    {
      name: "corporate wears",
      img: "/category.png",
    },
    {
      name: "kids",
      img: "/category.png",
    },
  ];
  return (
    <div className=" flex gap-x-5 overflow-x-scroll mt-4 hide-horizontal-scrollbar">
      {categories.map((category, index) => (
        <div key={index} className=" shrink-0 flex flex-col items-center">
          <div className="  w-[70px] h-[70px] bg-gray-200 dark:bg-gray-800 rounded-full flex justify-center items-center ">
            <Image
              src={"/category.png"}
              width={50}
              height={50}
              className=" w-7 h-7 dark:hidden block"
              alt="category icon"
            />
            <Image
              src={'/category-light.png'}
              width={50}
              height={50}
              className=" w-7 h-7 hidden dark:block"
              alt="category icon"
            />
          </div>
          <p className=" text-center capitalize font-medium mt-1">{category.name}</p>
        </div>
      ))}
    </div>
  );
}
