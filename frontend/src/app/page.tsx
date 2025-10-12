"use client";

import HeroBg from "@/components/HeroBg";
import Navbar from "@/components/Navbar";
import { Crown } from "lucide-react";
import EmailInput from "@/components/EmailInput";
import { useState } from "react";
import Avatars from "@/components/Avatars";
import Modal from "@/components/Modal";

export default function Home() {
  const [success, setSuccess] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleOpen = () => {
    setSuccess(true);
    setTimeout(() => setAnimate(true), 100);
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setSuccess(false), 300);
  };

  return (
    <main className="md:px-0 px-5">
      {/* Success Modal  */}
      {success && <Modal animate={animate} onClose={handleClose} />}

      {/* Main Page */}
      <div className="font-sans max-w-5xl h-screen mx-auto flex flex-col items-center py-16 justify-between relative overflow-hidden">
        <Navbar />
        <HeroBg />
        <div className="max-w-lg text-center items-center md:backdrop-blur-sm backdrop-blur-xs">
          <div className="flex items-center justify-center font-medium md:text-sm text-xs mb-5 md:mt-0 mt-10">
            <div className="shadow-xs rounded-full py-2 flex space-x-2 items-center px-5 border">
              <Crown size={14} />
              <p>Beyond a Wait-list</p>
            </div>
          </div>
          <h1 className="font-bold md:text-5xl text-3xl mb-8">
            Early access to the wait-list
          </h1>
          <p className="dark:text-zinc-400 text-zinc-500 md:text-lg text-sm">
            Unlock exclusive early access to the groundbreaking Wait-list.
          </p>
          <p className="dark:text-zinc-400 text-zinc-500 md:text-lg text-sm">
            Subscribe now and stay ahead of the future!
          </p>

          {/* Email Input */}
          <div className="mt-10 mx-10 relative">
            <EmailInput onSuccess={handleOpen} />
          </div>

          {/* Joiners Avatar */}
          <Avatars label="Trusted by 42+ early joiners" more={false} />
        </div>
        <div></div>
      </div>
    </main>
  );
}
