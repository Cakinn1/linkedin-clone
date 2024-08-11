import { useState, useEffect } from "react";

/**
 * A custom React hook that tracks whether a given media query matches the current browser or device conditions.
 *
 * @param query - The media query string to match against (e.g., '(min-width: 768px)').
 * @returns A boolean value indicating whether the media query currently matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Ensure the handler is up-to-date with the latest query value
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);

    // Cleanup the event listener on component unmount to prevent memory leaks
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
