import { HomeScreenLoader, SkeletonLoader, SpinnerLoader } from "./components";
import { LoadingTypes } from "./loading.types";

interface LoadingProps {
  type: LoadingTypes;
  spinnerColor?: string;
}

/**
 * Reusable Loading component with many types of loading indiactors.
 *
 * This component renders another component based off which type is passed to
 * component
 *
 * @param props
 * @param props.type - The type of loading indicator to display (from `LoadingTypes`).
 * @param props.spinnerColor -  Color of the spinner (Optional, Default: gray).
 */

const Loading: React.FC<LoadingProps> = ({ type, spinnerColor = "gray" }) => {
  const LoaderComponents: Record<LoadingTypes, React.ComponentType<any>> = {
    spinner: SpinnerLoader,
    skeleton: SkeletonLoader,
    homeScreen: HomeScreenLoader,
  };

  const LoaderComponent = LoaderComponents[type];

  if (!LoaderComponent) {
    throw new Error(`Invalid loading type ${type}`);
  }

  return (
    <>
      <LoaderComponent spinnerColor={spinnerColor} />
    </>
  );
};

export default Loading;
