import { Outlet } from "react-router-dom";
import Header from "../components/organism/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="p-3 mx-auto max-w-7xl">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
