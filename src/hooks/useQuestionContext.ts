import { useContext } from "react";
import { QuestionContext } from "../context/TimerContext";

export const useQuestionContext = () => {
  const {
    questions,
    setQuestions,
    subjectName,
    examName,
    answers,
    setAnswers,
    setSubjectName,
    setExamName,
  } = useContext(QuestionContext);
  if (
    !questions &&
    !setQuestions &&
    !subjectName &&
    !examName &&
    !answers &&
    !setAnswers &&
    !setExamName &&
    !setSubjectName
  ) {
       throw new Error(
         "useQuestionContext must be inside the QuestionProvider!"
       );
   
  }
     return {
       questions,
       setQuestions,
       subjectName,
       setSubjectName,
       examName,
       setExamName,
       answers,
       setAnswers,
     };
};

