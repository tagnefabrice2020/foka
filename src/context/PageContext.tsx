import React, { Dispatch, FC, ReactNode, SetStateAction, useState, createContext } from "react";

export type PageContextType = {
  page: "addQuestion" | "addTopic";
  setPage: Dispatch<SetStateAction<"addQuestion" | "addTopic">>;
};

export const PageContext = createContext<PageContextType>({
  page: "addTopic",
  setPage: () => null,
});

export type Props = {
  children: ReactNode;
};

export const PageContextProvider: FC<Props> = ({ children }) => {
    const [page, setPage] = useState<"addQuestion" | "addTopic">("addTopic");
    return (
      <PageContext.Provider value={{ page, setPage}}>
        <>{children}</>
      </PageContext.Provider>
    );
};
