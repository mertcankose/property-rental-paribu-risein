import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const RootLayout = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
