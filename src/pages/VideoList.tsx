import { useRecoilValue } from "recoil";
import { videosInfoAtom } from "../store";
import Cards from "../components/organism/Cards";

const VideoList = () => {
  const { queryKey, fn } = useRecoilValue(videosInfoAtom);

  return (
    <>
      <Cards queryKey={queryKey} fn={() => fn()} />
    </>
  );
};

export default VideoList;
