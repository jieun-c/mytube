import { useEffect, useState } from "react";
import { useNavigate, useMatch, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdOndemandVideo, MdSearch } from "react-icons/md";
import { videoKeysAtom } from "../../store";
import { VIDEO_TYPE } from "../../types";

const Header = () => {
  const [keys, setKeys] = useRecoilState(videoKeysAtom);
  const [input, setInput] = useState(keys[2].search ?? "");
  const navigate = useNavigate();
  const params = useParams();
  const mainMatch = useMatch("/");
  const detailMatch = useMatch("/detail/:videoId");
  const searchMatch = useMatch("/search");

  // 주소직접접근, 뒤로가기 를 위한 초기화
  useEffect(() => {
    if (mainMatch) {
      setKeys((prev) => [prev[0], { type: VIDEO_TYPE.POPULAR }, { search: "" }, { detailId: "" }]);
    } else if (searchMatch) {
      setKeys((prev) => [prev[0], { type: VIDEO_TYPE.SEARCH }, prev[2], { detailId: "" }]);
    } else if (detailMatch) {
      setKeys((prev) => [
        prev[0],
        { type: VIDEO_TYPE.RELATED },
        prev[2],
        { detailId: params.videoId },
      ]);
    }
  }, [mainMatch, searchMatch, detailMatch]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const str = input.replace(/^\s+|\s+$/gm, "");
    if (!str) return;

    setKeys((prev) => [prev[0], { type: VIDEO_TYPE.SEARCH }, { search: str }, prev[3]]);
    setInput(str);
    navigate({
      pathname: "/search",
      search: `q=${str}`,
    });
  };

  const onReset = () => {
    setKeys((prev) => [prev[0], { type: VIDEO_TYPE.POPULAR }, { search: "" }, { detailId: "" }]);
    setInput("");
    navigate("/");
  };

  return (
    <div className="bg-white">
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
