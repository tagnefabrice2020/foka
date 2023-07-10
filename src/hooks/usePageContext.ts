import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PageContext } from "../context/PageContext";

export const usePageContext = () => {
  const { page, setPage } =
    useContext(PageContext);

  if (!page && !setPage) {
    throw new Error("usePageContext must be inside the AuthPageProvider!");
  }

  return { page, setPage };
};
