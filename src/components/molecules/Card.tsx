import { IVideo } from "../../types";

const Card = ({ video }: { video: IVideo }) => {
  const {
    thumbnails: {
      medium: { url },
    },
    title,
    channelTitle,
    publishedAt,
  } = video.snippet;

  return (
    <div className="bg-white shadow-md rounded overflow-hidden cursor-pointer flex flex-col">
      <img src={url} alt={title} className="w-full" />
      <div className="p-1 flex flex-col flex-1">
        <p className="text-base font-bold flex-1 line-clamp-2">{title}</p>
        <p className="text-sm text-slate-500 pt-2 truncate ...">{channelTitle}</p>
        <p className="text-sm text-slate-500">{new Date(publishedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Card;

/*
 <div>
      <img src="https://placehold.co/1000x600" alt="" />
      <p>title</p>
      <p>chanel</p>
      <p>1 years ago</p>
    </div>
*/
