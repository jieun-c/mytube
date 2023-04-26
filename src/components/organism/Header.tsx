import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdOndemandVideo, MdSearch } from "react-icons/md";
import { videoKeysAtom, VIDEO_TYPE } from "../../store";

const Header = () => {
  const [keys, setKeys] = useRecoilState(videoKeysAtom);
  const [input, setInput] = useState("");
  const [searchParams] = useSearchParams();
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // HOME
    if (!searchParams.get("q") && !param.videoId) {
      onReset();
    }
    // 검색
    else if (searchParams.get("q")) {
      setInput(searchParams.get("q") ?? "");
      setKeys((prev) => [
        prev[0],
        { type: VIDEO_TYPE.SEARCH },
        { search: searchParams.get("q") ?? "" },
        { detailId: "" },
      ]);
    }
    // 상세페이지
    else {
      if (!keys[2].search) {
        // setInput(keys[2].search ?? "");
        setKeys((prev) => [
          prev[0],
          { type: VIDEO_TYPE.POPULAR },
          { search: "" },
          { detailId: param.videoId },
        ]);
      } else {
        setInput(keys[2].search ?? "");
        setKeys((prev) => [
          prev[0],
          { type: VIDEO_TYPE.SEARCH },
          { search: keys[2].search },
          { detailId: param.videoId },
        ]);
      }
    }
  }, [searchParams.get("q"), param.videoId]); // 비디오 아이디 의존성

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!input) {
      onReset();
    } else {
      setKeys((prev) => [prev[0], { type: VIDEO_TYPE.SEARCH }, { search: input }, prev[3]]);

      navigate({
        pathname: "/",
        search: `q=${input}`,
      });
    }
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
