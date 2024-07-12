import { Button } from "../../Button";
import { FaChevronDown } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
  setAvatarInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 *
 * Renders navigation button to open users avatar info
 *
 * @param {AvatarProps} props - The component's properties.
 * @param {func} props.setAvatarInfo - A function to update the state variable controlling the visibility of the avatar info menu.
 *
 * @returns {JSX.Element} A React element representing opening and closing avatar info menu
 */

const Avatar: React.FC<AvatarProps> = ({ setAvatarInfo }: AvatarProps): JSX.Element => {
  return (
    <div>
      <Button
        onClick={() => setAvatarInfo((prevAvatar) => !prevAvatar)}
        varient="navBtn"
        classString="flex-col"
        startIcon={<RxAvatar className="text-2xl" />}
      >
        <div className="flex items-center gap-x-[1px]">
          Me
          <FaChevronDown />
        </div>
      </Button>
    </div>
  );
};

export default Avatar;
