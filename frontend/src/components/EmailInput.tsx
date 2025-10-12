"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Loader } from "lucide-react";

const EmailInput = ({ onSuccess }: { onSuccess: () => void }) => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Handle Join WaitList
  const handleJoinWaitList = () => {
    setLoading(true);
    onSuccess();
    // Error Toast
    toast.error("Hello", {
      className: "!bg-red-500 !text-white",
      duration: 8000,
      position: "bottom-center",
    });
  };

  return (
    <>
      {/* Input and Button */}
      <Input
        type="email"
        className="rounded-full h-16 ps-6 placeholder:text-lg !text-lg border border-zinc-300"
        placeholder="Email"
        value={emailAddress}
        disabled={loading}
        onChange={(e) => setEmailAddress(e.currentTarget.value)}
      />
      <Button
        onClick={handleJoinWaitList}
        disabled={loading}
        className="absolute top-0 right-0 rounded-full h-14 w-24 mt-1 me-1"
      >
        {loading ? <Loader className="animate-spin" /> : "Join"}
      </Button>
    </>
  );
};

export default EmailInput;
