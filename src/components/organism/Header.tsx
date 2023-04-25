import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdOndemandVideo, MdSearch } from "react-icons/md";
import { videoKeysAtom, VIDEO_TYPE } from "../../store";

const Header = () => {
  const [keys, setKeys] = useRecoilState(videoKeysAtom);
  const [input, setInput] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("q")) {
      setKeys((prev) => [
        prev[0],
        { type: VIDEO_TYPE.SEARCH },
        { search: searchParams.get("q") ?? "" },
        prev[3],
      ]);
      setInput(searchParams.get("q") ?? "");
    } else {
      setKeys((prev) => [prev[0], { type: VIDEO_TYPE.POPULAR }, { search: "" }, prev[3]]);
      setInput("");
    }
  }, [searchParams, setKeys]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!input) {
      onReset();
    } else {
      navigate({
        pathname: "/",
        search: `q=${input}`,
      });
    }
  };

  const onReset = () => {
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
