import React, { PropsWithChildren, useState } from "react";
import { ButtonSize, ButtonType, ButtonVarient } from "./Button.types";
// testing
import clsx from "clsx";
import { Spinner } from "../Spinner";

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
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  endIcon,
  loading,
  onClick,
  size = ButtonSize.MEDIUM,
  startIcon,
  varient = "primary",
  type = ButtonType.BUTTON,
  href,
  classString,
  liked,
}) => {
  const isDisabled = loading || disabled;
  const buttonType = href ? "a" : "button";
  // Move classes into variable onec class is complete
  // const buttonClasses = clsx("flex items-center bg-green-500 ")

  return (
    <button
      type={buttonType === "button" ? type : undefined}
      className={clsx(
        "border flex items-center p-2 duration-300 rounded-md justify-center active:scale-95",
        {
          "border-none hover:bg-gray-100 ": varient === "social",
          "px-6 py-4 text-lg": size === ButtonSize.LARGE,
          "px-3 py-1 text-sm": size === ButtonSize.SMALL,
          "bg-blue-600 px-3 py-4 text-white text-sm rounded-3xl  hover:bg-blue-800 ":
            varient === "primary",
          "rounded-full p-2 border-none hover:bg-gray-100 ":
            varient === "tertiary",
          "bg-gray-100": liked,
        },
        classString
      )}
      disabled={isDisabled}
      onClick={onClick}
      {...(buttonType === "a" && { href })} // change button into a link
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {startIcon && <span>{startIcon}</span>}
          {children}
          {endIcon && <span>{startIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
