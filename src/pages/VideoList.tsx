import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { videosInfoAtom } from "../store";
import { IVideo } from "../types";
import Loading from "../components/molecules/Loading";
import Card from "../components/molecules/Card";

const VideoList = () => {
  const { queryKey, queryFn } = useRecoilValue(videosInfoAtom);
  const { isLoading, isError, data: videos } = useQuery({ queryKey, queryFn });

  if (isLoading) return <Loading />;
  if (isError) throw Error;

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video: IVideo) => (
          <Card key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};

export default VideoList;
