import React from "react";
import { IconType } from "./Spinner.types";
import { FaSpinner } from "react-icons/fa";

interface SpinnerProps {
  loadingIcon?: IconType;
}

const Spinner: React.FC<SpinnerProps> = ({ loadingIcon = FaSpinner }) => {
  return (
    <div>{<FaSpinner className="animate-spin" />}</div>
  );
};

export default Spinner;
