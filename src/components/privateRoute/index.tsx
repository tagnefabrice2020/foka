import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useIsAuth } from "../../hooks/useIsAuth";

const PrivateRoute = ({ component: Component, location, ...rest }: any) => {
  const {
    state: { isAuth, user },
    loading,
  } = useAuthContext();

  const { dispatch } = useAuthContext();

  const { navigate } = useI18next();
  if (isAuth && !loading) {
    return <Component {...rest} />;
  } else if (!isAuth && !loading) {
    navigate("/account/login");
    return null;
  }

  return null;
};

export default PrivateRoute;
