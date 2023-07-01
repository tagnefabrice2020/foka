import React from "react";
import { styled } from "styled-components";

const SideMenu = () => {
  return <SideMenuContainer></SideMenuContainer>;
};

const SideMenuContainer = styled.aside`
  position: absolute;
  top: 51px;
  width: 220px;
  height: calc(100% - 51px);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

export default SideMenu;
