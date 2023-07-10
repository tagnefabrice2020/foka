import React, { useEffect } from "react";
import "./../../app.css";
import Header from "../header";
import Footer from "../footer";
import SideMenu from "../sidemenu";
import { Toaster } from "react-hot-toast";
import { axiosInstance1 } from "../../settings/axiosSetting";
import { API_URL } from "../../settings/apis";

type Prop = {
  children: React.ReactNode;
};

const Layout = ({ children }: Prop) => {
  useEffect(() => {
    async function loadCsrfToken() {
      await axiosInstance1.get(API_URL.sanctum).then((r) => console.log(r)).catch((e) => null);
    }
    // loadCsrfToken();
  }, []);
  return (
    <>
      <Header />

      {children}
      <div>
        <Toaster />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
