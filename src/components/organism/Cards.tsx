import { useQuery } from "@tanstack/react-query";
import { IVideo } from "../../types";
import Card from "../molecules/Card";

const Cards = () => {
  const getData = () => {
    return fetch("/videos.json")
      .then((res) => res.json())
      .then((data) => data.items);
  };

  const {
    isLoading,
    isError,
    data: videos,
  } = useQuery({ queryKey: ["videos"], queryFn: () => getData() });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video: IVideo) => (
          <Card key={video.id} video={video} />
        ))}
        <>{console.log(videos)}</>
      </div>
    </div>
  );
};

export default Cards;
