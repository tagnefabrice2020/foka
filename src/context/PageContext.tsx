import React, { Dispatch, FC, ReactNode, SetStateAction, useState, createContext } from "react";


export interface TopicInterface {
  author_id: number;
  created_at: string;
  description: string;
  id: number;
  name: string;
  questions_count: number;
  tags: string;
  type: string;
  updated_at: string;
  uuid: string;
}

export type PageContextType = {
  page: "addQuestion" | "addTopic" | "questionList" | "editTopic";
  setPage: Dispatch<
    SetStateAction<"addQuestion" | "addTopic" | "questionList" | "editTopic">
  >;
  setSelectedTopic: Dispatch<SetStateAction<TopicInterface | null>>;
  selectedTopic: TopicInterface | null;
};

export const PageContext = createContext<PageContextType>({
  page: "questionList",
  setPage: () => null,
  selectedTopic: null, // topic id
  setSelectedTopic: () => null,
});

export type Props = {
  children: ReactNode;
};


export const PageContextProvider: FC<Props> = ({ children }) => {
  const [page, setPage] = useState<
    "addQuestion" | "addTopic" | "questionList" | "editTopic"
  >("questionList");
  const [selectedTopic, setSelectedTopic] = useState<TopicInterface | null>(null);
    return (
      <PageContext.Provider
        value={{ page, setPage, selectedTopic, setSelectedTopic }}
      >
        <>{children}</>
      </PageContext.Provider>
    );
};
