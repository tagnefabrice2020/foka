import { styled } from "styled-components";

export const Input = styled.input<{
  $primary?: boolean;
  $secondary?: boolean;
}>`
  border: 1px solid #d0d7de;
  padding: 0 12px;
  width: 100%;
  height: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: rgba(208, 215, 222, 0.2) 0px 1px 0px inset;
  &:focus-visible {
    outline: 2px solid rgba(208, 215, 222, 0.5);
  }
`;
