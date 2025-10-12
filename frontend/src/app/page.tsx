import HeroBg from "@/components/HeroBg";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="font-sans max-w-5xl h-screen mx-auto flex flex-col items-center py-20 justify-between relative overflow-hidden">
      <Navbar />
      <HeroBg />
      <div className="w-lg text-center items-center backdrop-blur-sm">
        <div className="flex items-center justify-center font-medium text-sm mb-5">
          <div className="shadow-xs rounded-full py-2 flex ite-ce space-x-2  items-center px-5 border">
            <Crown size={14} />
            <p>Beyond a Wait-list</p>
          </div>
        </div>
        <h1 className="font-bold text-5xl mb-8">
          Early access to the wait-list
        </h1>
        <p className="dark:text-zinc-400 text-zinc-500 text-lg">
          Unlock exclusive early access to groundbreaking Wait-list.
        </p>
        <p className="dark:text-zinc-400 text-zinc-500 text-lg">
          Subscribe now and stay ahead of the future!
        </p>

        <div className="mt-10 mx-10 relative">
          <Input
            className="rounded-full h-16 ps-6 placeholder:text-lg !text-lg"
            placeholder="Email"
          />
          <Button className="absolute top-0 right-0 rounded-full h-14 w-24 mt-1 me-1">
            Join
          </Button>
        </div>

        <div className="flex items-center justify-center mt-10 space-x-3">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
            <Avatar>
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/98009847?v=4"
                alt="@kid-us"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/94002610?v=4"
                alt="@jamescog"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/48279189?v=4"
                alt="@chapi3"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>

          <p className="text-sm text-zinc-500 font-medium">
            Trusted by 42+ early joiners
          </p>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
