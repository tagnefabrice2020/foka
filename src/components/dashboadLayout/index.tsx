import React from "react";
import "./../../app.css";
import SideMenu from "../sidemenu";
import Layout from "../layout";

type Prop = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Prop) => {
  return (
   
      <Layout>
        <SideMenu />
        <>{children}</>
      </Layout>
  );
};

export default DashboardLayout;
