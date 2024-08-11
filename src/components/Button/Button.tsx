import React, { PropsWithChildren, useEffect } from "react";
import { ButtonSize, ButtonType, ButtonVarient } from "./Button.types";
import clsx from "clsx";
import { Loading } from "../Loading";
import { Link } from "react-router-dom";

interface ButtonProps extends PropsWithChildren {
  size?: ButtonSize;
  varient?: ButtonVarient;
  loading?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactElement | null;
  endIcon?: React.ReactElement | null;
  onClick?: () => void;
  type?: ButtonType;
  href?: string;
  classString?: string;
  liked?: boolean;
  id?: string;
  iconClassString?: string;
}

/**
 *
 * Reusable Button component with customizable styles and functionality
 *
 * This component renders a button that can be used for various actions.
 * It supports different sizes, styles, loading states, icon and can also function as a link
 *
 * @param props
 * @param children - Elements inside button (optional)
 * @param size - Size of button ("small" | "medium" | "large"). (Default: "medium").
 * @param disabled - Whether the button is disabled (boolean, optional)
 * @param endIcon - Icon position at the end (React element, optional)
 * @param loading - Loading state, disables children elements when true (boolean, optional)
 * @param onClick - Function to be called when the button is clicked (func, optional)
 * @param href - Changes button into link element (string, optional)
 * @param liked - Checks if button has been liked (boolean, optional)
 * @param type - Type of the button element ("button" | "submit" | "reset"). (Default: "button")
 * @param classString - Additional CSS classes to apply to the button (string, optional)
 * @param id - Unique identifier for the button (string, optional)
 * @param iconClassString - additional CSS classes applied to endIcon & startIcon. (string, optional)
 *
 */

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  endIcon,
  loading,
  onClick,
  size = "medium",
  startIcon,
  varient = "primary",
  type = "button",
  href,
  classString,
  liked,
  id,
  iconClassString,
}) => {
  // disables button if either is true
  const isDisabled = loading || disabled;
  // Changes button type to either link or button
  const buttonType = href ? "a" : "button";

  const buttonClasses = clsx(
    "border flex items-center p-2 duration-300 rounded-md justify-center active:scale-95",
    {
      "border-none hover:bg-gray-100 ": varient === "social",
      "px-6 py-4 text-lg": size === "large",
      "px-3 py-1 text-sm": size === "small",
      "bg-blue-600 px-3 py-4 text-white text-sm rounded-3xl  hover:bg-blue-800 ":
        varient === "primary",
      "rounded-full p-2 border-none hover:bg-gray-100 ": varient === "tertiary",
      "bg-gray-100": liked,
      "border-none text-[#00000099] font-thin text-sm hover:text-black":
        varient === "navBtn",
    },
    classString
  );


  // change anything here to update all buttons
  const ResuableButton = () => {
    return (
      <button
        data-testid={id}
        type={type}
        className={buttonClasses}
        disabled={isDisabled}
        onClick={onClick}
      >
        {loading ? (
          <Loading type="spinner" />
        ) : (
          <>
            {startIcon && <span className={iconClassString}>{startIcon}</span>}
            {children}
            {endIcon && <span className={iconClassString}>{endIcon}</span>}
          </>
        )}
      </button>
    );
  };

  const ButtonWithLink = () => {
    return (
      <Link to={href!}>
        <ResuableButton />
      </Link>
    );
  };

  return buttonType === "a" ? <ButtonWithLink /> : <ResuableButton />;
};

export default Button;
