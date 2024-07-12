interface CloseSearchInputProps {
  handleFocus: (value: boolean) => void;
}

/**
 * Renders modal for user to close out of focus state
 *
 * @param {CloseSearchInputProps} props - The component's properties.
 * @param {func} props.handleFocus - closes and opens focus state (func).
 *
 * @returns {JSX.Element} A React element representing a model.
 */

const CloseSearchInput: React.FC<CloseSearchInputProps> = ({ handleFocus }: CloseSearchInputProps): JSX.Element => {
  return (
    <div
      onClick={() => handleFocus(false)}
      className="fixed duration-300 top-0 left-0 cursor-pointer bg-black h-full w-full bg-opacity-50"
    ></div>
  );
};

export default CloseSearchInput;
