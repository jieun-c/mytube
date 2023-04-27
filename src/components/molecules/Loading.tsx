import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="h-[calc(100vh-60px-0.75rem-0.75rem)] flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin mr-3" color="blue" size="30" />
      <span>Loading..</span>
    </div>
  );
};

export default Loading;
