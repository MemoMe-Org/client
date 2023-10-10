"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "~/public/logo.png";
import { LargeLinks } from "./LargeLinks";
import { MobileDrawer } from "./MobileDrawer";
import { ToggleButton } from "./toggleButton";

export default function Navbar() {
  const [opened, setOpened] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClicks(e: MouseEvent): void {
      if (headerRef.current?.contains(e.target as Node)) {
        return;
      }
      setOpened(false);
    }
    window.addEventListener("click", handleClicks);
    return () => {
      window.removeEventListener("click", handleClicks);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="w-full px-[33px] py-[21px] lg:py-[39px] lg:px-[71px] text-black border-b border-white/20"
    >
      <nav className="container flex items-center justify-between px-3 mx-auto">
        <div className="flex flex-row items-center lg:gap-20 ">
          <Link href="/" onClick={() => setOpened(false)}>
            <b className="text-xl font-black md:text-2xl">
              <span>Memo</span>
              <span className="text-[#FF9400]-1">Me</span>
            </b>
          </Link>
          <LargeLinks />
        </div>
        <ToggleButton setOpened={setOpened} opened={opened} />
        <div className="hidden md:block">
          <Link href="/auth/login">
            <div className="bg-[#FF9400] rounded-md lg:px-[60px] lg:py-4 text-white text-base font-semibold transition-all duration-300 active:scale-90 hover:scale-105">
              Register
            </div>
          </Link>
        </div>
      </nav>
      <MobileDrawer opened={opened} setOpened={setOpened} />
    </header>
  );
}
