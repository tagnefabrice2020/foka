import React from "react";
import { styled } from "styled-components";

const Header = () => {
  return (
    <NavBarContainer>
      <NavBar>
        <div id="logo">
          <img alt="logo" src="" />
        </div>
        <LanguageContainer id="langauges">
          <LanguageText>English</LanguageText>
          <LanguageText>French</LanguageText>
        </LanguageContainer>
        <Avartar id="avartar">
          <p>TF</p>
        </Avartar>
      </NavBar>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  height: 51px;
  width: 100%;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px,
    rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  background: #f5f8fa;
  z-index: 9;
  position: fixed;
  top: 0px;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1285px;
  height: 51px;
  padding: 10px;
  position: fixed;
  
  z-index: 1;
  width: 100%;
  left: 50%;
  transform: translate(-50%);
`;

const LanguageContainer = styled.div`
  display: flex;
  column-gap: 0.5rem;
  flex-direction: row;
  height: calc(51px - 20px);
`;

const LanguageText = styled.p`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Avartar = styled.div`
  height: calc(51px - 10px);
  width: calc(51px - 10px);
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default Header;
