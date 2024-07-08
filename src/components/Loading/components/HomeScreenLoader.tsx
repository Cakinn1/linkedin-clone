import { LinkedInLogo } from "../../../assets";

const HomeScreenLoader: React.FC = ({}) => {

    // add animation for bar below
  return (
    <div className="h-screen fixed flex flex-col w-full text-black bg-[#f4f2ee] top-0 left-0  z-50">
      <div className="mx-auto my-48 flex flex-col space-y-4">
        <LinkedInLogo />
        <div className="mx-auto bg-[#bbb1a1] h-[2px] w-2/3">
          <div className="bg-blue-500 h-[2px] w-[30px]"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreenLoader;
