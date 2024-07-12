import { Button } from "../../Button";
import { capitalizeWords } from "../../../lib";
import { NavRightItemsProps } from "../Nav";

interface RightItemsProps extends NavRightItemsProps {
  titleToCheck: string;
}

/**
 * Renders clickable navigation links
 *
 * @param {RightItemsProps} props - The component's properties.
 * @param {React.ReactElement} props.baseIcon - The default icon when not on the corresponding navigation area.
 * @param {React.ReactElement} props.activeIcon - The icon to display when on the corresponding navigation area.
 * @param {string} props.link - The URL that the navigation link points to.
 * @param {string} props.title - The text label for the navigation link (will be capitalized).
 * @param {string} props.titleToCheck - The current page's title (used for determining the active state).
 *
 * @returns {JSX.Element} A React element representing the navigation link with its icon and indicator.
 */

const RightItems: React.FC<RightItemsProps> = ({
  baseIcon,
  activeIcon,
  link,
  title,
  titleToCheck,
}): JSX.Element => {
  const onCurrentTitleAndPath = title.replaceAll(" ", "") === titleToCheck;

  return (
    <div className="relative">
      <Button
        classString="flex-col bg-transparent"
        varient="navBtn"
        startIcon={onCurrentTitleAndPath ? activeIcon : baseIcon}
        iconClassString="text-2xl"
        href={link}
      >
        {capitalizeWords(title)}
      </Button>
      <div
        className={`absolute bg-black h-[2px] duration-300 ${onCurrentTitleAndPath ? "w-full" : "w-0"}  -bottom-2`}
      ></div>
    </div>
  );
};

export default RightItems;
