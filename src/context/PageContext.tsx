import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
  createContext,
  useEffect,
} from "react";
import { appendQueryParameters } from "../utils/appendQueryParameters";

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
  page: "addQuestion" | "addTopic" | "questionList" | "editTopic" | "";
  setPage: Dispatch<
    SetStateAction<
      "addQuestion" | "addTopic" | "questionList" | "editTopic" | ""
    >
  >;
  setSelectedTopic: Dispatch<SetStateAction<TopicInterface | null>>;
  selectedTopic: TopicInterface | null;
  topics: TopicInterface[];
  setTopics: Dispatch<SetStateAction<TopicInterface[]>>;
};

export const PageContext = createContext<PageContextType>({
  page: "questionList",
  setPage: () => null,
  selectedTopic: null, // topic id
  setSelectedTopic: () => null,
  topics: [],
  setTopics: () => null,
});

export type Props = {
  children: ReactNode;
};

export const PageContextProvider: FC<Props> = ({ children }) => {
  const [page, setPage] = useState<
    "addQuestion" | "addTopic" | "questionList" | "editTopic" | ""
  >("");
  const [selectedTopic, setSelectedTopic] = useState<TopicInterface | null>(
    null
  );

  const [topics, setTopics] = useState<TopicInterface[]>([]);

  return (
    <PageContext.Provider
      value={{
        page,
        setPage,
        selectedTopic,
        setSelectedTopic,
        topics,
        setTopics,
      }}
    >
      <>{children}</>
    </PageContext.Provider>
  );
};
