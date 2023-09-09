import { useState } from "react";
import { axiosInstance } from "../settings/axiosSetting";
import { useAuthContext } from "./useAuthContext";
import { useI18next } from "gatsby-plugin-react-i18next";
import { useLocation } from "@reach/router";
import { useIsAuth } from "./useIsAuth";
import { API_URL } from "../settings/apis";

export const useLogout = () => {
  const [error, setError] = useState<string>("");

  const { dispatch } = useAuthContext();

  const { setLoading } = useIsAuth();

  const { navigate } = useI18next();

  const location = useLocation();

  const logout = () => {
    setLoading(true);

    delete axiosInstance.defaults.headers.common["Authorization"];
    typeof window !== undefined && localStorage.removeItem("token");
    typeof window !== undefined && localStorage.removeItem("user");

    axiosInstance
      .post(`${API_URL.logout}`)
      .then((response) => {
        // Handle the successful logout
        // Perform any additional actions (e.g., redirecting to the login page)
        dispatch({ type: "LOGOUT" });
        navigate("/account/login");

        setLoading(false);
        return null;
      })
      .catch((error) => {
        // Handle the error
        console.error("Logout error:", error);
      });
  };

  return { logout, error };
};
