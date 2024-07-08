import { FaXmark } from "react-icons/fa6";
import { Button } from "../../Button";

interface ToastCloseButtonProps {
  onClick: () => void;
}

/**
 *
 * Renders a button for manually closing a toast notification.
 *
 * When clicked, it triggers the 'onClick' function to dismiss the toast.
 *
 * @param props - ToastCloseButton component properties.
 * @param props.onClick - The function to call when the button is clicked.
 */

const ToastCloseButton: React.FC<ToastCloseButtonProps> = ({ onClick }) => {
  return (
    <span
      className="absolute right-4 top-4"
      role="button"
      aria-label="Close toast"
    >
      <Button
        onClick={onClick}
        startIcon={<FaXmark />}
        varient="tertiary"
        id={"close-button"}
        classString="ml-auto p-0 hover:bg-transparent text-gray-400 hover:text-black rounded-full border-none"
      />
    </span>
  );
};

export default ToastCloseButton;
