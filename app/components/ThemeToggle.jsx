"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import light from "../../public/light-mode.png";
import dark from "../../public/dark-mode.png";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? (
        <Image src={light} className=" w-10 h-10" alt=" light mode icon" />
      ) : (
        <Image src={dark} alt=" dark mode icon" className=" w-8 h-8" />
      )}
    </button>
  );
}
