import { useState } from "react";
import { QuestionType } from "../formSchema/questionSchema";
import { axiosAuthInstance } from "../settings/axiosSetting";
import { API_URL } from "../settings/apis";
import ToastNotification from "../components/toast";

const useQuestion = () => {
  const [isPending, setIspending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [questions, setQuestions] = useState([]);

  const createQuestion = async ({
    question,
    tags,
    options,
    topic,
  }: QuestionType): Promise<boolean> => {
    setIspending(true);
    const data = { question, tags, options, topic };
    let response = await axiosAuthInstance.post(`${API_URL.questions}`, data);
   
    if (response.status === 200) {
      setIspending(false);
      setError("");
      ToastNotification({ message: "Successfull", type: "success" });
      return true;
    }
    setError("Ooops something went wrong!");
    setIspending(false);
    ToastNotification({ message: "Successfull", type: "error" });

    return false;
  };

  const getQuestionList = async (id: number): Promise<boolean> => {
    setIspending(true);
    let response = await axiosAuthInstance.get(API_URL.questions);

    if (response.status === 200) {
      setIspending(false);
      setQuestions(response.data.data);
      return true;
    }
    return false;
  };

  return {
    createQuestion,
    getQuestionList,
    setIspending,
    isPending,
    error,
    setError,
    page,
    setPage,
  };
};

export default useQuestion;
