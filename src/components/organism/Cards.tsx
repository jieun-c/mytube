import { useQuery } from "@tanstack/react-query";
import { VIDEO_TYPE } from "../../store";
import { IVideo, IVideosInfo } from "../../types";
import Card from "../molecules/Card";

const Cards = ({ queryKey, queryFn }: IVideosInfo) => {
  const { isLoading, isError, data: videos } = useQuery({ queryKey, queryFn });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {queryKey[1].type === VIDEO_TYPE.POPULAR &&
          videos.map((video: IVideo) => <Card key={video.id} video={video} id={video.id} />)}

        {queryKey[1].type === VIDEO_TYPE.SEARCH &&
          videos.map((video: IVideo) => (
            <Card key={video.id.videoId} video={video} id={video.id.videoId} />
          ))}
      </div>
    </div>
  );
};

export default Cards;
