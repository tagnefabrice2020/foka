import React, {
  createContext,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useIsAuth } from "../hooks/useIsAuth";

type UserType = {
  country_id: number | null | undefined;
  created_at: string | null | undefined;
  email: string | null | undefined;
  email_verified_at: string | null | undefined;
  id: number | null | undefined;
  name: string | null | undefined;
  role_id: number | null | undefined;
  updated_at: string | null | undefined;
  username: string | null | undefined;
  uuid: string | null | undefined;
};

export type AuthContextType = {
  token: string | null;
  isAuth: boolean;
  user: UserType | null | undefined;
};

type c = {
  state: AuthContextType;
  dispatch: React.Dispatch<any>;
  loading: boolean;
  screenWidth: number;
  setScreenWidth: React.Dispatch<SetStateAction<number>>;
};

export const AuthContext = createContext<c>({
  state: {
    token: null,
    isAuth: false,
    user: null,
  },
  dispatch: () => null,
  loading: true,
  screenWidth: typeof window !== "undefined" ? window.innerWidth : 0,
  setScreenWidth: () => null,
});

export type Props = {
  children: ReactNode;
};

export const authReducer = (
  state: AuthContextType,
  action: any
): AuthContextType => {
  let data = action.payload;
  switch (action.type) {
    case "PENDING":
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
      };
    case "SUCCESS":
      return {
        ...state,
        token: data.token,
        user: { ...data.user },
        isAuth: true,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
      };
    case "ERROR":
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
      };
    default:
      return state;
  }
};

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const { isAuth: auth } = useIsAuth();

  const [screenWidth, setScreenWidth] = useState<any>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const getElementDisplay = () => {
    let width = typeof window !== "undefined" ? window.innerWidth : 0;
    setScreenWidth(width);
  };

  // Update the item size when the window dimensions change
  useEffect(() => {
    const handleResize = () => {
      // Update the item size based on the new window dimensions
      getElementDisplay();
      // Update the item size in your state or context if needed
      // For example, you can set it as a separate state variable or use context to share it across components
    };

    handleResize();
    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  const initialState = {
    token: null,
    user: null,
    isAuth: auth,
  };

  if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
    const user: UserType | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    const initialState = {
      token: token || null,
      user: user || null,
      isAuth: auth,
    };
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  const [mounted, setMounted] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function f() {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        const user: UserType = JSON.parse(
          (typeof window !== undefined && localStorage.getItem("user")) ||
            (null as unknown as string)
        );

        if (user && token && mounted) {
          // alert("dispatching")
          dispatch({
            type: "SUCCESS",
            payload: { token, user: user },
          });
        }
        setLoading(false);
      }
    }

    f();

    return () => setMounted(false);
  }, [mounted]);

  return (
    <AuthContext.Provider
      value={{ state, dispatch, loading, screenWidth, setScreenWidth }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
