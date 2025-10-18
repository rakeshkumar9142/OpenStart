// src/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import OpenStartPopup from "./components/OpenStartPopup/OpenStartPopup";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
      <OpenStartPopup />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
