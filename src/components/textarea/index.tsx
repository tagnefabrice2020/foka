import { styled } from "styled-components";

export const TextArea = styled.textarea<{
  $primary?: boolean;
  $secondary?: boolean;
}>`
  padding: 10px;
  border: 1px solid #d0d7de;
  border-radius: 0.5rem;
  &:focus-visible {
    outline: 2px solid rgba(208, 215, 222, 0.5);
  }
`;
