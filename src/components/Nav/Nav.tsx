import React, { useState } from "react";
import CloseSearchInput from "./components/CloseSearchInput";
import LeftItems from "./components/LeftItems";
import RightItems from "./components/RightItems";
import { useLocation } from "react-router-dom";
import Avatar from "./components/Avatar";
import AvatarInfo from "./components/AvatarInfo";
import { FaHome } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";

export interface NavRightItemsProps {
  baseIcon: React.ReactElement;
  activeIcon: React.ReactElement;
  title: string;
  link: string;
}

const NavRightItems: NavRightItemsProps[] = [
  {
    baseIcon: <IoMdHome />,
    link: "feed/",
    title: "home",
    activeIcon: <FaHome />,
  },
  {
    baseIcon: <MdPeopleAlt />,
    link: "mynetwork/grow/",
    title: "my network",
    activeIcon: <IoPeopleSharp />,
  },
  {
    baseIcon: <BsFillBriefcaseFill />,
    link: "jobs/",
    title: "jobs",
    // need to find briefcase that actually opens cant seem to find it on react icons
    // or maybe just create it myself with css
    activeIcon: <BsFillBriefcaseFill />,
  },
  {
    baseIcon: <FaBell />,
    link: "notifications/?filter=all",
    title: "notifications",
    activeIcon: <HiMiniBellAlert />,
  },
];

/**
 * The main navigation bar for this application.
 *
 * @returns {JSX.Element} A React element representing the nav component
 */

const Nav: React.FC = ({}): JSX.Element => {
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [avatarInfo, setAvatarInfo] = useState<boolean>(false);
  const location = useLocation();


  const currentPath = location.pathname.split("/")[1] as string;
  const titleToCheck =
    currentPath === "feed"
      ? "home"
      : (currentPath.replaceAll(" ", "") as string);

  const handleFocus = (bool: boolean) => {
    setFocusInput(bool);
  };

  const onClose = () => {
    setAvatarInfo(false);
  };

  return (
    <>
      <nav
        className="bg-[#fff] border-b z-50 p-2 fixed left-0 top-0 w-full"
        onClick={() => focusInput && handleFocus(false)}
      >
        <div className="max-w-[900px] relative gap-x-4 mx-auto flex items-center justify-between flex-1">
          <LeftItems focusInput={focusInput} handleFocus={handleFocus} />
          {NavRightItems.map((ele) => (
            <RightItems {...ele} titleToCheck={titleToCheck} />
          ))}
          <Avatar setAvatarInfo={setAvatarInfo} />
          {avatarInfo && <AvatarInfo onClose={onClose} />}
        </div>
      </nav>
      {focusInput && <CloseSearchInput handleFocus={handleFocus} />}
    </>
  );
};

export default Nav;
