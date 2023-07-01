import React from "react";
import { styled } from "styled-components";

type Props = {
  checked: boolean;
};

const CheckBox = ({ checked }: Props) => {
  return <Container>{checked ? <Selected /> : <NotSelected />}</Container>;
};

const Container = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #eee;
`;

const Selected = styled.div`
  width: 0.6rem;
  height: 1rem;
  border-right: 0.2rem solid #333;
  border-bottom: 0.2rem solid #333;
  transform: rotate(35deg);
`;

const NotSelected = styled.div`
  width: 1.5rem;
  height: 0.2rem;
  background: #333;
  border-radius: 50px;
`;

export default CheckBox;
