import clsx from "clsx";
import { ToastMessageType } from "../Toast.types";

interface ToastProgressProps {
  progress: number;
  message: ToastMessageType;
}

/**
 * Renders a progress bar to visually indicate the remaining time
 * before the toast is automatically dismissed.
 *
 * @param props - The ToastProgress component properties.
 * @param props.progress - The current progress value (0-100).
 * @param props.message - The type of progress bar background color to display.
 */
const ToastProgress: React.FC<ToastProgressProps> = ({ progress, message }) => {
  return (
    <div
      style={{ width: `${progress}%` }}
      className={clsx(`absolute duration-300 bottom-0 left-0 h-2 `, {
        "bg-red-500": message === "error",
        "bg-green-500": message === "success",
      })}
    ></div>
  );
};

export default ToastProgress;
