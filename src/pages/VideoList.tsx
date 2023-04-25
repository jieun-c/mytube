import { useRecoilValue } from "recoil";
import { videosInfoAtom } from "../store";
import Cards from "../components/organism/Cards";

const VideoList = () => {
  const { queryKey, queryFn } = useRecoilValue(videosInfoAtom);

  return (
    <>
      <Cards queryKey={queryKey} queryFn={() => queryFn()} />
    </>
  );
};

export default VideoList;
