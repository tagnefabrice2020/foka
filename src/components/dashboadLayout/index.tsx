import React from "react";
import "./../../app.css";
import SideMenu from "../sidemenu";
import Layout from "../layout";
import { styled } from "styled-components";

type Prop = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Prop) => {
  return (
    <Layout>
      <SideMenu />
      <MainSection>
        <>{children}</>
      </MainSection>
    </Layout>
  );
};

const MainSection = styled.section`
  margin-left: 220px;
  margin-top: 51px;
  padding: 0.2rem 0.275rem;
  height: calc(100vh - 51px);
`;

export default DashboardLayout;
