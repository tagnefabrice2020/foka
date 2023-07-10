import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const { state, dispatch, loading, screenWidth, setScreenWidth } =
    useContext(AuthContext);

  if (!state && !dispatch) {
    throw new Error("useAuthContext must be inside the AuthContextProvider!");
  }

  return { state, dispatch, loading, screenWidth, setScreenWidth };
};
