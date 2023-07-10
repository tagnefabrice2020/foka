import { styled } from "styled-components";

export const Select = styled.select<{
  $primary?: boolean;
  $secondary?: boolean;
}>`
  border-width: 1px;
  border-color: #000;
  padding: 0 12px;
  width: 100%;
  height: 2.5rem;
  box-shadow: rgba(208, 215, 222, 0.2) 0px 1px 0px inset;
  &:focus-visible {
    outline: 2px solid rgba(208, 215, 222, 0.5);
  }
`;
