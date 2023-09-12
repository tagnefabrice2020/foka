import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PageContext } from "../context/PageContext";

export const usePageContext = () => {
  const {
    questionPage,
    setQuestionPage,
    selectedTopic,
    setSelectedTopic,
    topics,
    setTopics,
    questions,
    setQuestions,
    totalQuestionPages,
    setTotalQuestionPages
  } = useContext(PageContext);

  // if (
  //   !questionPage ||
  //   !setQuestionPage ||
  //   !selectedTopic ||
  //   !setSelectedTopic ||
  //   !topics ||
  //   !setTopics ||
  //   !questions ||
  //   !setQuestions
  // ) {
  //   throw new Error("usePageContext must be inside the AuthPageProvider!");
  // }

  return {
    questionPage,
    setQuestionPage,
    selectedTopic,
    setSelectedTopic,
    topics,
    setTopics,
    questions,
    setQuestions,
    totalQuestionPages,
    setTotalQuestionPages
  };
};
