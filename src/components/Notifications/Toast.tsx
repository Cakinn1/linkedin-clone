import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonType, ButtonVarient } from "../Button";
import { MdError } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
export enum ToastPosition {
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM_LEFT = "bottom-left",
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
}

// continue adding more typings here as application grows
export enum ToastMessageType {
  DANGER = "error",
  SUCCESS = "success",
}

interface ToastProps {
  messageType: ToastMessageType;
  position?: ToastPosition;
  message?: string;
}

const Toast: React.FC<ToastProps> = ({
  messageType,
  position = ToastPosition.BOTTOM_RIGHT,
  message,
}) => {
  const [progress, setProgress] = useState<number>(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [closeToast, setCloseToast] = useState<boolean>(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - 2;
        if (newProgress <= 0) {
          clearInterval(intervalRef.current!);
          setCloseToast(true)
        }
        return newProgress;
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const positionClassess: Record<string, string> = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
  };

  const iconType: Record<string, React.ReactElement> = {
    error: <MdError />,
    success: <FaCircleCheck className="text-green-500" />,
  };

  const explained = messageType === "error" ? "Error has occured!" : "Success!";

  return (
    <div
      className={`${closeToast ? "-translate-x-[120%]" : ""}   duration-300 fixed flex flex-col ${positionClassess[position]} justify-center bg-white shadow-md  overflow-hidden  border w-[350px] min-h-[80px]  rounded-lg p-4`}
    >
      <span className="absolute right-4 top-4">
        <Button
          type={ButtonType.BUTTON}
          onClick={() => setCloseToast(!closeToast)}
          startIcon={<FaXmark />}
          varient={ButtonVarient.TERTIARY}
          classString="ml-auto p-0 hover:bg-transparent text-gray-400 hover:text-black rounded-full border-none"
        />
      </span>
      <div className="flex gap-x-4">
        <span className="text-2xl text-red-500">{iconType[messageType]}</span>
        <h1 className="text-[#757575]">{explained}</h1>
      </div>
      <div
        style={{ width: `${progress}%` }}
        className={`absolute duration-300 bottom-0 left-0 h-2 ${messageType === "error" ? "bg-red-500" : "bg-green-500"}  `}
      ></div>
    </div>
  );
};

export default Toast;
