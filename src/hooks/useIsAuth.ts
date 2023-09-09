import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import { useAuthContext } from "./useAuthContext";
import checkSanctumTokenValidity from "../settings/checkSanctumTokenValidity";

export const useIsAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useAuthContext();
  let token = state?.token?.replace(/^b'|'$/g, "");
  const isAuthenticated = async () => {
    if (token) {
      let isAuth = await checkSanctumTokenValidity(token);
      if (isAuth) {
        setIsAuth(true);
      }
    } else {
      setIsAuth(false);
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    isAuthenticated();

    return () => {
      setLoading(false);
    };
  }, [loading]);

  return { loading, isAuth, setLoading }; // remove loading 17/06/2023
};
