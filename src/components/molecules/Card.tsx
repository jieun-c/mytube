import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IVideo, VIDEO_TYPE } from "../../types";
import { videoKeysAtom } from "../../store";
import { timeForToday } from "../../utils";

const Card = ({ video }: { video: IVideo }) => {
  const {
    title,
    channelTitle,
    publishedAt,
    thumbnails: {
      medium: { url },
    },
  } = video.snippet;

  const navigate = useNavigate();
  const [_keys, setKeys] = useRecoilState(videoKeysAtom);

  const movePage = () => {
    setKeys((prev) => [prev[0], { type: VIDEO_TYPE.RELATED }, prev[2], { detailId: video.id }]);
    navigate(`/detail/${video.id}`, { state: { data: video } });
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
        <p className="text-sm text-slate-500">
          {timeForToday(new Date(publishedAt).toLocaleDateString())}
        </p>
      </div>
    </div>
  );
};

export default Card;
