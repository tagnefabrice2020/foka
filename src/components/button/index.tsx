import { css, styled } from "styled-components";

export const Button = styled.button<{
  $primary?: boolean;
  $secondary?: boolean;
}>`
  cursor: pointer;
  padding: 0.5rem 1rem;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props) =>
    props.$primary &&
    css`
      background: #4fb5ff;
      border: none;
      color: #fff;
    `}

  ${(props) =>
    props.$secondary &&
    css`
      background: #fff;
      border: none;
      color: #4fb5ff;
      text-decoration: underline;
    `}
`;
