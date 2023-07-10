import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../settings/apis";
import { axiosInstance } from "../settings/axiosSetting";
import { useAuthContext } from "./useAuthContext";
import { useI18next } from "gatsby-plugin-react-i18next";
import ToastNotification from "../components/toast";

const useRegister = () => {
  type Props = {
    email: string;
    name: string;
    password: string;
  };

  const { dispatch } = useAuthContext();
  const { navigate } = useI18next();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const register = ({ email, name, password }: Props) => {
    setIsPending(true);
    let data = { email, name, password };

    axiosInstance
      .post(`${API_URL.register}`, data)
      .then((r) => {
        const cleanedToken = r.data.token.replace(/^b'|'$/g, "");
        axiosInstance.defaults.headers.common["Bearer"] = `${cleanedToken}`;

        const user = r.data.user;
        let token = r.data.token;
        let data = {
          isAuth: true,
          token: token,
          user: { ...user },
        };

        typeof window !== undefined &&
          localStorage.setItem("user", JSON.stringify(user));

        typeof window !== undefined && localStorage.setItem("token", token);
        ToastNotification({ message: "Successfull...redirecting", type: "success" });
        dispatch({ type: "SUCCESS", payload: data });
        setIsPending(false);
        // redirect
        navigate("/account/questions", { replace: true });
      })
      .catch((error) => {
        if (error.message === "net::ERR_INTERNET_DISCONNECTED") {
          // Handle the internet disconnected error
          setError("Internet disconnected");
        } else {
          // Handle other errors
          console.error("An error occurred:", error);
        }
        ToastNotification({ message: "Error occured", type: "error" });
        setIsPending(false);
      });
  };

  return { register, isPending, error };
};

export default useRegister;
