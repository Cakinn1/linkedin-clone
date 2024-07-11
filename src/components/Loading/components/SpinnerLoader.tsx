import { ImSpinner8 } from "react-icons/im";

interface SpinnerLoaderProps {
  spinnerColor: string;
}

/**
 * Renders a spinning loading spinner icon.
 * The icon is animated to spin and styled with color.
 *
 * @param props
 * @param props.spinnerColor - The color of the spinner. (default: gray)
 *
 */

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({ spinnerColor }) => {
  return (
    <ImSpinner8 style={{ color: spinnerColor }} className={`animate-spin `} />
  );
};

export default SpinnerLoader;
