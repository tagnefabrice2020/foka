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

export interface Option {
  id: number;
  uuid: string;
  question_id: number;
  option_text: string;
  is_correct: number;
  created_at: string; // This should be a timestamp or date string
  updated_at: string; // This should be a timestamp or date string
}
export interface Question {
  id: number;
  uuid: string;
  topic_id: number;
  created_by: number;
  question: string;
  tags: string;
  created_at: string; // This should be a timestamp or date string
  updated_at: string; // This should be a timestamp or date string
  options: Option[];
}

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
  questionPage: number;
  setQuestionPage: Dispatch<SetStateAction<number>>;
  totalQuestionPages: number;
  setTotalQuestionPages: Dispatch<SetStateAction<number>>;
  setSelectedTopic: Dispatch<SetStateAction<TopicInterface | null>>;
  selectedTopic: TopicInterface | null;
  topics: TopicInterface[];
  setTopics: Dispatch<SetStateAction<TopicInterface[]>>;
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
};

export const PageContext = createContext<PageContextType>({
  questionPage: 1,
  setQuestionPage: () => null,
  selectedTopic: null, // topic id
  setSelectedTopic: () => null,
  topics: [],
  setTopics: () => null,
  questions: [],
  setQuestions: () => null,
  totalQuestionPages: 0,
  setTotalQuestionPages: () => null,
});

export type Props = {
  children: ReactNode;
};

export const PageContextProvider: FC<Props> = ({ children }) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicInterface | null>(
    null
  );

  const [questions, setQuestions] = useState<Question[]>([]);
const [totalQuestionPages, setTotalQuestionPages] = useState<number>(0);
  const [questionPage, setQuestionPage] = useState<number>(1);

  const [topics, setTopics] = useState<TopicInterface[]>([]);

  return (
    <PageContext.Provider
      value={{
        questionPage,
        setQuestionPage,
        selectedTopic,
        setSelectedTopic,
        topics,
        setTopics,
        questions,
        setQuestions,
        totalQuestionPages,
        setTotalQuestionPages,
      }}
    >
      <>{children}</>
    </PageContext.Provider>
  );
};
