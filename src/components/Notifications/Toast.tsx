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
}

/**
 * Renders a toast notification with a progress bar.
 *
 * This component automatically disappears (from the dom) after a short delay,
 * and its progress bar indicates the remaining time before disappearing.
 *
 *
 * @todo (#1) Currently "position" prop is not working as attended and needs to get fixed
 * @todo (#2) Add support for multiple toasts displayed simultaneously.
 * @todo (#3) could use requestAnimationFrame for a smoother progress bar
 * @todo (#$) Implement more ways to customize the toast's appearance (colors, styles, icons, etc)
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
   * Defines the content (icon and message) for each toast type
   * Makes it easy to customize the toast's appearance based on its message type.
   */
  const toastContent: Record<
    ToastMessageType,
    { icon: React.ReactElement; message: string }
  > = {
    error: {
      icon: <MdError className="text-red-500" />,
      message: "Error has occurred",
    },
    success: {
      icon: <FaCircleCheck className="text-green-500" />,
      message: "Success",
    },
  };

  /**
   * Handles the action of closing the toast notification.
   *
   * - Clears the progress bar interval.
   * - Initiates the closing animation sequence.
   * - After animation completion, resets the progress and closes
   *    the toast in the Redux store.
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
   * Initiates the toast closing animation and dispatches
   * the Redux action to close the toast after a delay.
   */
  const animateAndCloseToast = () => {
    setTimeout(() => setIsClosing(true), CLOSE_DELAY_MS);
    setTimeout(() => {
      setIsClosing(false);
      dispatch(openAndCloseToast(false));
    }, ANIMATION_DURATION_MS);
  };

  /**
   * Updates the progress of the toast's progress bar.
   *
   * Decrements the progress value and, when the progress reaches zero, triggers
   *  the toast closing animation.
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
   * Manages the lifecycle of the toast's progress bar and closing animation.
   *
   * - If the toast is open (`isOpen` is true), it starts an interval to update the progress bar.
   * - If the toast is closed (`isOpen` is false), it clears the interval, resets the progress,
   *   and prepares for the next animation.
   *
   * Dependencies:
   * - `isOpen`: This effect runs when the toast is opened or closed.
   * - `dispatch`: This effect dispatches actions to the Redux store
   */

  useEffect(() => {
    if (!isOpen) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setProgress(100);
        setOpenAnimation(true);
        setIsClosing(false);
      }
      return;
    }
    intervalRef.current = setInterval(updateProgress, 100);
  }, [isOpen, dispatch]);

  /**
   * Manages the opening animation of the toast.
   *
   * - If the toast is open and hasn't finished animating (`isOpen` and `openAnimation` are true),
   *   it starts a timeout to trigger the end of the opening animation.
   *
   * Dependencies:
   * - `isOpen`: Whether the toast is open.
   * - `openAnimation`: Whether the opening animation is in progress.
   */

  useEffect(() => {
    if (isOpen && openAnimation) {
      const timerId = setTimeout(() => {
        setOpenAnimation(false);
      }, OPEN_ANIMATION_MS);

      return () => clearTimeout(timerId);
    }
  }, [isOpen, openAnimation]);

  return (
    <>
      {isOpen && (
        <div
          className={clsx(
            `  duration-300 fixed flex flex-col bottom-8 justify-center bg-white shadow-md  overflow-hidden  border w-[350px] min-h-[80px]  rounded-lg p-4`,
            {
              "-left-[400px]": openAnimation,
              "left-8": !openAnimation,
              "-translate-x-[120%]": isClosing,
            }
          )}
        >
          <ToastCloseButton onClick={closeToastButton} />
          <ToastContainer>
            <ToastIcon icon={toastContent[messageType].icon} />
            <ToastMessage message={toastContent[messageType].message} />
          </ToastContainer>
          <ToastProgress message={messageType} progress={progress} />
        </div>
      )}
    </>
  );
};

export default Toast;
