import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MdOndemandVideo, MdSearch } from "react-icons/md";
import { keyAtom, KEYS } from "../../store";

const Header = () => {
  const [key, setKey] = useRecoilState(keyAtom);
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      // searchParams 를 기준으로 key, input setting
      setKey([KEYS[1], searchParams.get("q") ?? ""]);
      setInput(searchParams.get("q") ?? "");
    }
  }, [searchParams, setKey]); // 뒤로가기 감지

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    // input 을 기준으로 key, SearchParams setting
    if (!input) {
      onReset();
    } else {
      setKey([KEYS[1], input]);
      setSearchParams({ q: input });
    }
  };

  const onReset = () => {
    setInput("");
    setKey([KEYS[0], ""]);
    searchParams.delete("q");
    setSearchParams(searchParams);
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
