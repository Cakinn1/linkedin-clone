interface ToastIconProps {
  icon: React.ReactElement;
}

/**
 * Renders an icon within a Toast notification.
 *
 * Provides visual feedback to the user about the nature of
 * the toast message (e.g., success, error).
 *
 * @param props - The ToastIcon component properties.
 * @param props.icon - The React element representing the icon to be displayed.
 */
const ToastIcon: React.FC<ToastIconProps> = ({ icon }) => {
  return <span className="text-2xl">{icon}</span>;
};
export default ToastIcon;
