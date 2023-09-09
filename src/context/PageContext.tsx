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

  useEffect(() => {
    function updateUrl() {
      if (page === "addQuestion") {
        const urlParams = new URLSearchParams(window.location.search);
        const topic = urlParams.get("topic");
        appendQueryParameters({
          params: {
            section: "add-a-question",
            topic: selectedTopic?.uuid || (topic as unknown as string),
          },
        });
      } else if (page === "addTopic") {
        appendQueryParameters({ params: { section: "add-a-topic" } });
      } else if (page === "questionList") {
        appendQueryParameters({ params: { section: "question-list" } });
      } else if (page === "editTopic") {
        const urlParams = new URLSearchParams(window.location.search);
        const topic = urlParams.get("topic");
        appendQueryParameters({
          params: {
            section: "edit-topic",
            topic: selectedTopic?.uuid || (topic as unknown as string),
          },
        });
      }
    }
    updateUrl();
  }, [page, selectedTopic]);

  useEffect(() => {
    function f() {
      // Parse the query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get("section");

      if (page === "add-a-question") {
        setPage("addQuestion");
      } else if (page === "add-a-topic") {
        setPage("addTopic");
      } else if (page === "question-list") {
        setPage("questionList");
      } else if (page === "edit-topic") {
        setPage("editTopic");
      }
    }

    f();
  }, [page]);

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
