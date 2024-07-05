import React, { useEffect, useRef, useState } from "react";
import { MdError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { ToastMessageType, ToastPosition } from "./Toast.types";
import ToastCloseButton from "./components/ToastCloseButton";
import ToastProgress from "./components/ToastProgress";
import ToastContainer from "./components/ToastContainer";
import ToastMessage from "./components/ToastMessage";
import ToastIcon from "./components/ToastIcon";

interface ToastProps {
  messageType: ToastMessageType;
  position?: ToastPosition;
}

/**
 * Renders a toast notification with a progress bar.
 *
 * This component automatically disappears (from the dom) after a short delay,
 * and its progress bar indicates the remaining time before disappearing.
 *
 * @param props - The toast component properties
 * @param props.messageType - Determines the toast type (error or message) and content.
 * @param props.position - Controls the toast placement on the screen.
 */

const Toast: React.FC<ToastProps> = ({
  messageType,
  position = "bottom-right",
}) => {
  const [progress, setProgress] = useState<number>(100);
  const [closeToast, setCloseToast] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Maps toast position to corresponding CSS classes.
   * Used to position the toast based on the 'position' prop
   */
  const positionClassess: Record<string, string> = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
  };

  /**
   * Defines the content (icon and message) for each toast type
   * Makes it easy to customize the toast's appearance based on its message type.
   */
  const toastContent: Record<
    ToastMessageType,
    { icon: React.ReactElement; message: string }
  > = {
    error: { icon: <MdError className="text-red-500" />, message: "Error has occured" },
    success: {
      icon: <FaCircleCheck className="text-green-500" />,
      message: "Succes",
    },
  };

  /**
   * A button to close the toast notification
   *
   * When Clicked:
   * - Triggers the toast to disppear.
   * - Clears the progress interval if the toast is closed manually.
   */
  const closeToastButton = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCloseToast((prevValue) => !prevValue);
  };

  /**
   * Manges the toast's progress bar and automatically disappears.
   *
   * Sets up an interval to decrement the 'progress' state every 100ms.
   * When 'progress' reaches 0 or below:
   *    - Clears the interval to stop further updates.
   *    - Triggers the toast to close by setting 'close toast' to 'true'.
   *
   * Cleanup functionL Ckears the interval when the component unmounts
   * to prevent memory leaks.
   *
   */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress - 2;
        if (newProgress <= 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
          setCloseToast(true);
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

  return (
    <div
      className={`${closeToast ? "-translate-x-[120%]" : ""}   duration-300 fixed flex flex-col ${positionClassess[position]} justify-center bg-white shadow-md  overflow-hidden  border w-[350px] min-h-[80px]  rounded-lg p-4`}
    >
      <ToastCloseButton onClick={closeToastButton} />
      <ToastContainer>
        <ToastIcon icon={toastContent[messageType].icon} />
        <ToastMessage message={toastContent[messageType].message} />
      </ToastContainer>
      <ToastProgress message={messageType} progress={progress} />
    </div>
  );
};

export default Toast;
