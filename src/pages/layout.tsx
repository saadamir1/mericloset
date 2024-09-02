import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const layout = () => {
  return (
    <>
      <NavBar onSearch={() => console.log(" Navbar of layout")} />
      <Outlet />
    </>
  );
};

export default layout;
