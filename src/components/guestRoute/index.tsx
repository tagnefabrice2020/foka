import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useI18next } from "gatsby-plugin-react-i18next";
import { useIsAuth } from "../../hooks/useIsAuth";

const GuestRoute = ({ component: Component, location, ...rest }: any) => {
  const {
    state: { isAuth, user, token },
  } = useAuthContext();

  const { loading } = useIsAuth();

  const { navigate } = useI18next();

  const pathnameWithoutLang = location.pathname.replace(/^\/[a-z]{2}\b/, "");

  if (!loading && isAuth) {
    navigate("/account/questions");
    return null;
  }
  // token is expired redirect to login or register page
  if (
    !isAuth &&
    (pathnameWithoutLang !== `/account/login` ||
      pathnameWithoutLang !== `/account/register`)
  ) {
    // dispatch({type: "LOGOUT"})
    return <Component {...rest} />;
  }

  return null;
};

export default GuestRoute;
