import { css, styled } from "styled-components";

export const Button = styled.button<{
  $primary?: boolean;
  $secondary?: boolean;
  $tertiary?: boolean;
  $danger?: boolean;
}>`
  cursor: pointer;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: "3px";
  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props) =>
    props.$primary &&
    css`
      background: linear-gradient(130deg, #2870ea 20%, #1b4aef 77.5%);
      border: none;
      color: #fff;
      border-radius: 3px;
    `}
  ${(props) =>
    props.$secondary &&
    css`
      background: #fff;
      border: none;
      color: #4fb5ff;
      text-decoration: underline;
      border-radius: 3px;
    `};

  ${(props) =>
    props.$danger &&
    css`
      background: linear-gradient(130deg, #ea2828 20%, #d91148 77.5%);
      border: none;
      color: #fff;
      border-radius: 3px;
    `}

  ${(props) =>
    props.$tertiary &&
    css`
      background: linear-gradient(130deg, #ea2828 20%, #d91148 77.5%);
      border: none;
      color: #fff;
      border-radius: 50px;
    `}
`;
