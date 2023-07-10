import React from "react";

type Props = {
    message: string | undefined
}

const ErrorFormMessage = ({ message }: Props): JSX.Element => {
  return message ? (
      <span
        style={{ color: "red", fontSize: 12, fontFamily: "roboto, sans-serif" }}
      >
        {message}
      </span>
    ) : <></>;
};

export default ErrorFormMessage;
