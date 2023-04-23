import { MdOndemandVideo } from "react-icons/md";
import { MdSearch } from "react-icons/md";

const Header = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex justify-between p-3">
        <div className="flex items-center mr-3">
          <MdOndemandVideo size="30" color="red" title="mytube-logo" />
          <span className="ml-2">Mytube</span>
        </div>

        <form className="flex-1 flex">
          <input type="text" className="h-9 bg-slate-100 flex-1 indent-2" />
          <button type="button" className="h-9 bg-slate-100 px-3">
            <MdSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
