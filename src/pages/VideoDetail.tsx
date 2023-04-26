import { useEffect } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Cards from "../components/organism/Cards";
import { videoKeysAtom, videosInfoAtom } from "../store";

const VideoDetail = () => {
  const params = useParams();
  const keys = useRecoilValue(videoKeysAtom);
  const { queryKey, queryFn } = useRecoilValue(videosInfoAtom);
  // 상세 진입시 쿼리스트링 사라지는 버그 수정 필요

  return (
    <div>
      <iframe
        key={`${params.videoId}`}
        // id={`${params.videoId}`}
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${params.videoId}`}
        // frameBorder={"0"}
        style={{ border: "solid 4px #37474F" }}
      ></iframe>

      <Cards queryKey={queryKey} queryFn={() => queryFn()} />
    </div>
  );
};

export default VideoDetail;
