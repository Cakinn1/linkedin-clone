/**
 * Renders skeleton loading state for Profile card, providing visual
 * feedback while the actual profile data is being fetched.
 */

const SkeletonLoader: React.FC = ({}) => {
  return (
    <div className="h-[242px] bg-white w-[225px] border border-gray-200 rounded-md">
      <div className="h-[60px] bg-[#00000014] animate-pulse relative"></div>
      <div className="top-10 absolute  left-8 bg-white  flex justify-center items-center w-16 h-16 rounded-full">
        <div className="bg-[#00000014] z-1 h-14 w-14  animate-pulse rounded-full"></div>
      </div>
      <div className="p-4 py-0 mt-10 space-y-3">
        <div className="h-3 w-3/4 rounded-sm bg-[#00000014]"></div>
        <div className="h-3 w-2/4 rounded-sm bg-[#00000014]"></div>
      </div>
    </div>
  );
};
export default SkeletonLoader;
