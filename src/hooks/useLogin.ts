import { useState } from "react";
import { LoginType } from "../formSchema/login";
import { axiosInstance } from "../settings/axiosSetting";
import { useAuthContext } from "./useAuthContext";
import { useI18next } from "gatsby-plugin-react-i18next";
import ToastNotification from "../components/toast";
import { API_URL } from "../settings/apis";

const useLogin = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const { dispatch } = useAuthContext();
  const { navigate } = useI18next();

  const login = async ({ email, password }: LoginType) => {
    let data = { email, password };

    setIsPending(true);
    setError("");
    await axiosInstance
      .post(`${API_URL.login}`, data)
      .then((r) => {
        const cleanedToken = r.data.token.replace(/^b'|'$/g, "");
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${cleanedToken}`;

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
        ToastNotification({ message: "Successfull", type: "success" });
        dispatch({ type: "SUCCESS", payload: data });

        // redirect

        navigate("/account/questions", { replace: true });

        setIsPending(false);
      })
      .catch((e) => {
        setIsPending(false);
        ToastNotification({ message: "Error occured", type: "error" });
        if (e.message === "net::ERR_INTERNET_DISCONNECTED") {
          // Handle the internet disconnected error
          setError("Internet disconnected");
        } else if (e.response.status === 401) {
          setError(e.response.data.message);
        } else {
          // Handle other errors
          console.error("An error occurred:", error);
        }
      });
  };

  return { login, isPending, error };
};

export default useLogin;
