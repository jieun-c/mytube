import { useEffect, useState } from "react";
import { useNavigate, useMatch, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdOndemandVideo, MdSearch } from "react-icons/md";
import { videoKeysAtom } from "../../store";
import { VIDEO_TYPE } from "../../types";
import { getCurrentData } from "../../service";

const Header = () => {
  const [keys, setKeys] = useRecoilState(videoKeysAtom);
  const [input, setInput] = useState(keys.search ?? "");
  const navigate = useNavigate();

  const params = useParams();
  const mainMatch = useMatch("/");
  const detailMatch = useMatch("/detail/:videoId");
  const searchMatch = useMatch("/search");

  // 주소직접접근, 뒤로가기 를 위한 초기화
  useEffect(() => {
    if (mainMatch) {
      setKeys((prev) => ({
        ...prev,
        type: VIDEO_TYPE.POPULAR,
        search: "",
        detailId: "",
        channelId: "",
      }));
    } else if (searchMatch) {
      setKeys((prev) => ({
        ...prev,
        type: VIDEO_TYPE.SEARCH,
        detailId: "",
        channelId: "",
      }));
    } else if (detailMatch) {
      if (!keys.channelId) {
        // 주소 직접 접근시 데이터가 없으므로 currentVideo 서비스 호출
        getCurrentData(params.videoId ?? "").then((data: any) => {
          setKeys((prev) => ({
            ...prev,
            type: VIDEO_TYPE.RELATED,
            detailId: params.videoId ?? "",
            channelId: data[0].snippet.channelId,
          }));
        });
      } else {
        setKeys((prev) => ({
          ...prev,
          type: VIDEO_TYPE.RELATED,
          detailId: params.videoId ?? "",
          channelId: keys.channelId,
        }));
      }
    }
  }, [mainMatch, searchMatch, detailMatch]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const str = input.replace(/^\s+|\s+$/gm, "");
    if (!str) return;

    setKeys((prev) => ({
      ...prev,
      type: VIDEO_TYPE.SEARCH,
      search: str,
    }));
    setInput(str);
    navigate({
      pathname: "/search",
      search: `q=${str}`,
    });
  };

  const onReset = () => {
    setKeys((prev) => ({
      ...prev,
      type: VIDEO_TYPE.POPULAR,
      search: "",
      detailId: "",
      channelId: "",
    }));
    setInput("");
    navigate("/");
  };

  return (
    <div className="bg-white w-full fixed z-50">
      <div className="max-w-7xl mx-auto flex justify-between p-3">
        <div className="flex items-center mr-3 cursor-pointer" onClick={onReset}>
          <MdOndemandVideo size="30" color="red" title="mytube-logo" />
          <span className="ml-2">Mytube</span>
        </div>

        <form className="flex-1 flex">
          <input
            type="text"
            className="h-9 bg-slate-100 flex-1 indent-2"
            value={input}
            onChange={changeInput}
          />
          <button className="h-9 bg-slate-100 px-3" onClick={onSubmit}>
            <MdSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
