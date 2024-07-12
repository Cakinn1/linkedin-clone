import { FaSearch } from "react-icons/fa";
import { Logo } from "../../../assets";

interface LeftItemsProps {
  handleFocus: (value: boolean) => void;
  focusInput: boolean;
}

/**
 * Renders Logo and search input
 *
 * @param {LeftItemsProps} props - The component's properties.
 * @param {func} props.handleFocus - closes and opens focus state (func).
 * @param {boolean} props.focusInput - state to expand input width (boolean).
 *
 * @returns {JSX.Element} A React element representing the logo and search input
 */

const LeftItems: React.FC<LeftItemsProps> = ({ handleFocus, focusInput }: LeftItemsProps): JSX.Element => {
  return (
    <div className="flex items-center gap-x-2  flex-1">
      <Logo />
      <div onClick={() => handleFocus(true)} className="relative flex flex-1 ">
        <input
          placeholder="Search"
          className={`bg-[#EDF3F8] duration-300 rounded-md px-8 pl-12 py-2 ${focusInput ? "flex-1" : ""}`}
          type="text"
        />
        <FaSearch className="absolute left-5 top-3" />
      </div>
    </div>
  );
};

export default LeftItems;
