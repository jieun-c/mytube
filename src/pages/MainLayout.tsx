import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <p>Header</p>
      <Outlet />
      <p>Footer</p>
    </div>
  );
};

export default MainLayout;
