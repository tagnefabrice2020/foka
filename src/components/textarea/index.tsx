import { styled } from "styled-components";

export const TextArea = styled.textarea<{
  $primary?: boolean;
  $secondary?: boolean;
}>`
  padding: 10px;
  &:focus-visible {
    outline: 2px solid rgba(208, 215, 222, 0.5);
  }
`;
