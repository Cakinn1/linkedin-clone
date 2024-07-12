import { useEffect, useRef } from "react";

/**
 * A custom hook for detecthing clicks outside of a referenced element.
 *
 * @param onClose - a callback function that will be triggered when a click occurs outside the referenced element
 *
 * @returns {{ ref: React.MutableRefObject<HTMLDivElement | null> }}  An object containing the 'ref' that needs to be attached the the target element
 *
 * @example
 *
 * const { ref } = useClickOutside(() => {
 *  // Handle outside logic here
 * })
 *
 * return <div ref={ref}>Click outside me!</div>
 */

const useClickOutside = (
  onClose: () => void
): { ref: React.MutableRefObject<HTMLDivElement | null> } => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // checks if current element is not a child of referenced element.
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return { ref };
};

export default useClickOutside;
