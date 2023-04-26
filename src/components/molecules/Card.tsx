import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IVideo } from "../../types";
import { videoKeysAtom } from "../../store";

const Card = ({ video, id }: { video: IVideo; id: string }) => {
  const {
    thumbnails: {
      medium: { url },
    },
    title,
    channelTitle,
    publishedAt,
  } = video.snippet;

  const navigate = useNavigate();
  const [keys, setKeys] = useRecoilState(videoKeysAtom);

  const movePage = () => {
    setKeys((prev) => [prev[0], prev[1], prev[2], { detailId: id }]);
    navigate(`/videos/${id}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded overflow-hidden cursor-pointer flex flex-col"
      onClick={movePage}
    >
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
