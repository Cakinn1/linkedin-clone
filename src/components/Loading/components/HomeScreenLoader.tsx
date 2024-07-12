import { useEffect, useRef, useState } from "react";
import { LinkedInLogo } from "../../../assets";

/**
 *
 * Renders a full-screen loading animation with linkedin logo and bouncing progress bar.
 * (Typically used when re-rendering the page)
 *
 * @remarks
 * This component is typically used to provide visual feedback to the user
 * while the application is loading.
 *
 */

const HomeScreenLoader: React.FC = ({}) => {
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const leftEnd = 100 as number;
  const rightEnd = -24 as number;
  let flag = false as boolean;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= leftEnd) {
          flag = true;
        } else if (prevProgress <= rightEnd) {
          flag = false;
        }

        return flag ? prevProgress - 16 : prevProgress + 16;
      });
    }, 100);

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  return (
    <div className="h-screen fixed flex flex-col w-full text-black bg-[#f4f2ee] top-0 left-0  z-50">
      <div className="mx-auto my-48 flex flex-col space-y-4">
        <LinkedInLogo />
        <div className="mx-auto bg-[#bbb1a1] overflow-hidden h-[2px] w-2/3 relative">
          <div
            style={{ right: `${progress}%` }}
            className="bg-blue-500 h-[2px] w-[40px] absolute  duration-300"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreenLoader;
