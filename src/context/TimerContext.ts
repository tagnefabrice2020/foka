import React, { createContext } from "react";

export type Options = {
  isAnswer: boolean;
  option: string | string[];
};

export type TimerType = {
  isPaused: boolean;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
};

export type QuestionType = {
  id: string;
  question: string;
  options: Options[];
  isCorrect?: boolean;
  multiple_answers: number;
};

export type AnswerType = {
  question_id: string;
  option_id: number;
};

export type QuestionResultType = {
  docId: string;
  question: string;
  options: Options[];
  isCorrect: boolean;
};

export type ScoreType = {
  showScore: boolean;
  setShowScore: React.Dispatch<React.SetStateAction<boolean>>;
};

export type QuestionContextType = {
  answers: AnswerType[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerType[]>>;
  examName: string;
  setExamName: React.Dispatch<React.SetStateAction<string>>;
  subjectName: string;
  setSubjectName: React.Dispatch<React.SetStateAction<string>>;
  questions: QuestionType[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
};

export const QuestionContext = createContext<QuestionContextType>({
  answers: [],
  setAnswers: () => null,
  examName: "",
  setExamName: () => null,
  subjectName: "",
  setSubjectName: () => null,
  questions: [],
  setQuestions: () => null,
});

export const ScoreContext = createContext<ScoreType>({
  showScore: false,
  setShowScore: () => null,
});

export type sectionContextType = {
  section: "form" | "quiz" | "review" | "addQuestions";
  setSection: React.Dispatch<
    React.SetStateAction<"form" | "quiz" | "review" | "addQuestions">
  >;
};

export const SectionContext = createContext<sectionContextType>({
  section: "form",
  setSection: () => null,
});

export const TimerContext = createContext<TimerType>({
  isPaused: false,
  setPause: () => null,
  duration: 0,
  setDuration: () => null,
});
