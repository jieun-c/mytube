import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdOndemandVideo, MdSearch } from "react-icons/md";
import { videoKeysAtom } from "../../store";

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
      setKeys((prev) => [prev[0], { search: searchParams.get("q") ?? "" }, { detailId: "" }]);
    }
    // 상세페이지
    else {
      if (!keys[1].search) {
        setKeys((prev) => [prev[0], { search: "" }, { detailId: param.videoId }]);
      } else {
        setInput(keys[1].search ?? "");
        setKeys((prev) => [prev[0], { search: keys[1].search }, { detailId: param.videoId }]);
      }
    }
  }, [searchParams.get("q"), param.videoId]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const str = input.replace(/^\s+|\s+$/gm, "");

    if (!str) {
      onReset();
    } else {
      setKeys((prev) => [prev[0], { search: str }, prev[2]]);

      navigate({
        pathname: "/",
        search: `q=${str}`,
      });
    }

    setInput(str);
  };

  const onReset = () => {
    setKeys((prev) => [prev[0], { search: "" }, { detailId: "" }]);
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
