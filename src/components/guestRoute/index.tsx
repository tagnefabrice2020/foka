import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";

const GuestRoute = ({ component: Component, location, ...rest }: any) => {
  const { navigate } = useI18next();

  return <Component {...rest} />;
};

export default GuestRoute;
