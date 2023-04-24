import { Outlet } from "react-router-dom";
import Header from "../components/organism/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
