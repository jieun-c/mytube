import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { videosInfoAtom } from "../store";
import { IVideo } from "../types";
import Loading from "../components/molecules/Loading";
import Card from "../components/molecules/Card";

const VideoDetail = () => {
  const { queryKey, queryFn } = useRecoilValue(videosInfoAtom);
  const { data: videos, isLoading, isError } = useQuery({ queryKey, queryFn });
  const params = useParams();
  const location = useLocation();
  const [currentVideo, setCurrentVideo] = useState<IVideo>();
  const [more, setMore] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { data } = location.state;
      setCurrentVideo(data);
    } else {
      throw Error;
    }
  }, [location.state]);

  if (isLoading) return <Loading />;
  if (isError) throw Error;

  return (
    <div className="md:flex">
      {currentVideo && (
        <div className="md:mr-3 md:flex-1 md:mb-0 mb-10 shadow-md h-fit">
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              key={`${params.videoId}`}
              id="mytube-video"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${params.videoId}`}
              // frameBorder={"0"}
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
          <div className="bg-white p-3">
            <p className="text-md font-bold mb-1 line-clamp-2">{currentVideo.snippet.title}</p>
            <p className="text-sm">🥸 {currentVideo.snippet.channelTitle}</p>
            <div className="text-sm mt-5">
              <p className={!more ? "line-clamp-2" : ""}>{currentVideo.snippet.description}</p>

              {currentVideo.snippet.description.length > 100 && (
                <button onClick={() => setMore((prev) => !prev)} className="text-blue-600 mt-2">
                  {!more ? "더보기" : "숨기기"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="md:w-1/3 md:h-[calc(100vh-60px-0.75rem-0.75rem)] md:overflow-y-auto [&>*]:mb-4">
        {videos.map((video: IVideo) => (
          <Card key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoDetail;
