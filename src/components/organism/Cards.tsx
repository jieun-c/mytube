import { useQuery } from "@tanstack/react-query";
import { KEYS } from "../../store";
import { IVideo, IVideosInfo } from "../../types";
import Card from "../molecules/Card";

const Cards = ({ queryKey, fn }: IVideosInfo) => {
  const { isLoading, isError, data: videos } = useQuery({ queryKey: [...queryKey], queryFn: fn });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  if (KEYS.findIndex((key) => key === queryKey[0]) === -1) {
    return <span>Error: key 없음</span>;
  }

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {queryKey[0] === KEYS[0] &&
          videos.map((video: IVideo) => <Card key={video.id} video={video} />)}

        {queryKey[0] === KEYS[1] &&
          videos.map((video: IVideo) => <Card key={video.id.videoId} video={video} />)}
      </div>
    </div>
  );
};

export default Cards;
