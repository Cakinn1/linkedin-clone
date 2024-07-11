import React, { useEffect, useRef, useState } from "react";
import { MdError } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { ToastMessageType, ToastPosition } from "./Toast.types";
import ToastCloseButton from "./components/ToastCloseButton";
import ToastProgress from "./components/ToastProgress";
import ToastContainer from "./components/ToastContainer";
import ToastMessage from "./components/ToastMessage";
import ToastIcon from "./components/ToastIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { openAndCloseToast } from "../../store/toastSlice";
import clsx from "clsx";
import {
  ANIMATION_DURATION_MS,
  CLOSE_DELAY_MS,
  OPEN_ANIMATION_MS,
} from "../../lib";

interface ToastProps {
  messageType: ToastMessageType;
  position?: ToastPosition;
  autoClose?: boolean;
  hideProgressBar?: boolean;
}

/**
 * Renders a toast notification with a progress bar.
 *
 * This component automatically closes after a short delay, and its progress bar
 * indicates the remaining time before closing.
 *
 * @param props - The toast component properties
 * @param props.messageType - Determines the toast type (error or message) and content.
 * @param props.position - Controls the toast placement on the screen.
 * @param props.hideProgressBar - Hides the progress bar if true (default: false).
 * @param props.autoClose - Disables the progress bar interval and auto-closing behavior if false (default: true).
 */

const Toast: React.FC<ToastProps> = ({
  messageType,
  position = "bottom-right",
  autoClose = true,
  hideProgressBar = false,
}) => {
  const [progress, setProgress] = useState<number>(100);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [openAnimation, setOpenAnimation] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isOpen = useSelector((state: RootState) => state.toast.isOpen);
  const dispatch = useDispatch();

  /**
   * Maps toast position to corresponding CSS classes.
   * Used to position the toast based on the 'position' prop
   */
  const toastPositionClasses: Record<string, string> = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "top-right": "top-8 right-8",
    "top-left": "top-8 left-8",
  };

  /**
   * Defines the content (icon and message) for each toast type.
   */
  const toastContent: Record<
    ToastMessageType,
    { icon: React.ReactElement; message: string }
  > = {
    error: {
      icon: <MdError data-testid="error-icon" className="text-red-500" />,
      message: "Error has occurred",
    },
    success: {
      icon: (
        <FaCircleCheck data-testid="success-icon" className="text-green-500" />
      ),
      message: "Success",
    },
  };

  /**
   * Closes toast after animation.
   */
  const closeToastButton = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    animateAndCloseToast();
    const timerId = setTimeout(() => {
      setProgress(100);
      clearTimeout(timerId);
    }, ANIMATION_DURATION_MS);
  };

  /**
   * Animates and closes the toast.
   */
  const animateAndCloseToast = () => {
    setTimeout(() => setIsClosing(true), CLOSE_DELAY_MS);
    setTimeout(() => {
      setIsClosing(false);
      dispatch(openAndCloseToast(false));
    }, ANIMATION_DURATION_MS);
  };

  /**
   * Updates the progress bar value.
   */
  const updateProgress = () => {
    setProgress((prevProgress) => {
      const newProgress = prevProgress - 2;
      if (newProgress <= 0) {
        clearInterval(intervalRef.current!);
        animateAndCloseToast();
        return 0;
      }
      return newProgress;
    });
  };

  /**
   * Manages the progress bar and closing animation based on the toast's open state.
   */

  useEffect(() => {
    if (!isOpen) {
      // Resets porgress and animation when closed.
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setProgress(100);
        setOpenAnimation(true);
        setIsClosing(false);
      }
      return;
    }

    if (isOpen && autoClose) {
      intervalRef.current = setInterval(updateProgress, 100);
    }
  }, [isOpen, dispatch, autoClose]);

  /**
   * Manages the opening animation of the toast.
   */

  useEffect(() => {
    if (isOpen && openAnimation) {
      const timerId = setTimeout(() => {
        setOpenAnimation(false);
      }, OPEN_ANIMATION_MS);

      return () => clearTimeout(timerId);
    }
  }, [isOpen, openAnimation]);

  /**
   * CSS classes for toast section
   */
  const toastClass = clsx(
    `duration-300 fixed flex  flex-col bottom-8 
     justify-center bg-white shadow-md  overflow-hidden  
     border w-[350px] min-h-[80px]  rounded-lg p-4`,
    {
      "-left-[400px]": openAnimation,
      "left-8": !openAnimation,
      "-translate-x-[120%]": isClosing,
    }
  );

  return (
    <>
      {isOpen && (
        <div className={toastClass}>
          <ToastCloseButton onClick={closeToastButton} />
          <ToastContainer>
            <ToastIcon icon={toastContent[messageType].icon} />
            <ToastMessage message={toastContent[messageType].message} />
          </ToastContainer>
          {hideProgressBar ||
            (autoClose && (
              <ToastProgress message={messageType} progress={progress} />
            ))}
        </div>
      )}
    </>
  );
};

export default Toast;
