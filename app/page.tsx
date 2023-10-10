/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
// import NavBar from '@/components/Nav';
import { poppins, questrial } from "@/public/fonts/f";
import Navbar from "@/components/navbar/navbar";
import Button from "@/components/button";

export default function Home() {
  return (
    <>
      {/* <NavBar isAuthenticated={false} /> */}
      <Navbar />

      <main className={`${poppins.className} mx-auto mt-[100px] w-[100vw]`}>
        <section>
          {/* hero */}
          <div className="flex flex-col items-center mx-auto text-center">
            <h3
              className={`text-black font-bold mx-auto md:text-[40px] lg:max-w-[1250px]`}
            >
              Ultimate Anonymous Platform for Secure Communication, Polls,
              and Content Control
            </h3>
            <p className="lg:text-[20px] lg:max-w-[773px] text-center mx-auto lg:text-[#A9A9A9] font-normal  ">
              The ultimate anonymous platform for secure communication, hosting
              polls, and sharing without fear of judgment.
            </p>
            <div>
              <Link href="/signup">
                <Button className="border-memo border-[2px]" type="button">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
