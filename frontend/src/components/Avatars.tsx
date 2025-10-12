import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  more: boolean;
  label: string;
}

const Avatars = ({ label, more }: Props) => {
  return (
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
        {more && (
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/98009847?v=4"
              alt="@kid-us"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </div>

      <p className="text-sm text-zinc-500 font-medium">{label}</p>
    </div>
  );
};

export default Avatars;
