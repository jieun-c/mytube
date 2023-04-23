import { Outlet } from "react-router-dom";
import Header from "../components/organism/Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
