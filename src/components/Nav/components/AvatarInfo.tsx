import { RxAvatar } from "react-icons/rx";
import { Button } from "../../Button";
import { useClickOutside } from "../../../hooks";

interface AvatarInfoProps {
  onClose: () => void;
}

/**
 * Renders user info
 *
 * @param {AvatarInfoProps} props - The components properties
 * @param {func} props.onClose - Clsoes the component
 *
 * @returns {JSX.Element} A React element representing the users info and profile.
 */

const AvatarInfo: React.FC<AvatarInfoProps> = ({
  onClose,
}: AvatarInfoProps): JSX.Element => {
  const { ref } = useClickOutside(onClose);

  return (
    <div
      ref={ref}
      className="absolute space-y-2 right-0 bottom-[-220px] bg-[#fff] p-4 rounded-md w-[250px] h-[200px]"
    >
      <div className="flex items-center gap-x-4">
        <RxAvatar className="text-4xl" />
        <div>
          <h1>username </h1>
          <h2>job title</h2>
        </div>
      </div>

      <div className="w-full text-blue-400 duration-300 hover:bg-blue-100 cursor-pointer hover:border-blue-600 rounded-full font-thin flex justify-center items-center border  border-blue-400">
        <Button
          href="/"
          classString="text-blue-400 py-1 w-full"
          varient="navBtn"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default AvatarInfo;
