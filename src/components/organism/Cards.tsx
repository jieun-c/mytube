import { IVideo } from "../../types";
import Card from "../molecules/Card";

const gridCss = "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";
const miniCss = "md:w-1/3 md:h-[calc(100vh-60px-0.75rem-0.75rem)] md:overflow-y-auto [&>*]:mb-4";

const Cards = ({ isDetail, videos }: any) => {
  return (
    <div className={!isDetail ? gridCss : miniCss}>
      {videos.map((video: IVideo) => (
        <Card key={video.id} video={video} />
      ))}
    </div>
  );
};

export default Cards;
