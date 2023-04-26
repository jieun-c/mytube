import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { videosInfoAtom } from "../store";
import Cards from "../components/organism/Cards";

const VideoDetail = () => {
  const params = useParams();
  const { queryKey, queryFn } = useRecoilValue(videosInfoAtom);

  return (
    <div>
      <iframe
        key={`${params.videoId}`}
        id="mytube-video"
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${params.videoId}`}
        // frameBorder={"0"}
      ></iframe>

      <Cards queryKey={queryKey} queryFn={() => queryFn()} />
    </div>
  );
};

export default VideoDetail;
