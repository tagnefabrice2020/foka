import React from "react";
import "./../../app.css";
import Header from "../header";
import Footer from "../footer";
import SideMenu from "../sidemenu";

type Prop = {
  children: React.ReactNode;
};

const Layout = ({ children }: Prop) => {
  return (
    <>
      <Header />
      <SideMenu />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
