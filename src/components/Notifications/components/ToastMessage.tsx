interface ToastMessageProps {
  message: string;
}

/**
 * Renders a message to display to the user.
 * 
 * @param props - Toast message properties 
 * @param props.message - The type of message to display.
 */

const ToastMessage: React.FC<ToastMessageProps> = ({ message }) => {
  return <h1 className="text-[#757575]">{message}</h1>;
};

export default ToastMessage;
