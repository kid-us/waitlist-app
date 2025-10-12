import { SquareCheck, X } from "lucide-react";
import Avatars from "./Avatars";

interface Props {
  animate: boolean;
  onClose: () => void;
}

const Modal = ({ animate, onClose }: Props) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/90 z-20 transition-opacity duration-300 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transform transition-all duration-300 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="bg-white text-black p-16 rounded-xl text-center shadow-xl w-[450px] relative">
          <X
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition-transform duration-300"
          />
          <div className="flex justify-center mb-8">
            <SquareCheck size={60} className="text-green-500" />
          </div>

          <p className="text-2xl font-semibold mb-3">
            You’ve been added to our waitlist!
          </p>

          <p className="text-sm text-zinc-600 mb-8">
            Thank you for joining — you’ll be the first to know when we’re
            ready!
          </p>

          {/* Joiners Avatar */}
          <Avatars label="You're not alone — 42+ people joined" more={true} />
        </div>
      </div>
    </>
  );
};

export default Modal;
