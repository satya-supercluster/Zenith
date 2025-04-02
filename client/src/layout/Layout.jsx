import React, { useEffect } from "react";
// import Navbar from "@/components/Header/Navbar";
import { Outlet, useLocation } from "react-router-dom";
// import Footer from "@/components/Footer/Footer";
// import IconBar from "../components/IconBar/IconBar";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { scrollUp } from "@/components/ScrollToTop/ScrollToTop";
import { useData } from "../context/DataContext";
const Layout = () => {
    const { pathname } = useLocation();
    useEffect(scrollUp, [pathname]);
    const {isConstructed}=useData();


  return (
    <div>
      {/* isConstructed&&
      <Navbar /> */}
      {/* isConstructed&&
      <IconBar /> */}
      {/* <div className="mt-12 sm:mt-14"> */}
      <Outlet />
      {/* </div> */}
      {isConstructed && <ScrollToTop />}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
