import { PropsWithChildren } from "react";

/**
 * A container for displaying the content of a toast notification.
 *
 * This component is responsible for laying out the icon & message.
 *
 * @param children - The content to be displayed within the toast container.
 *
 */

const ToastContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex gap-x-4">{children}</div>;
};
export default ToastContainer;
