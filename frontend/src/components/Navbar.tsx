"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="flex items-center justify-between w-sm mx-auto border rounded-full ps-5 py-1 pe-1 bg-accent/30 h-11">
      <Image
        src={theme === "dark" ? "/logo-1.png" : "/logo-2.png"}
        width={40}
        height={40}
        className="w-[25px] object-contain"
        alt="Wait-list"
      />
      <Button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full h-8 w-8"
      >
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </nav>
  );
};

export default Navbar;
