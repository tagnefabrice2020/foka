import { useState } from "react";
import { OptionUpdateType, QuestionType, QuestionUpdateType } from "../formSchema/questionSchema";
import { axiosAuthInstance } from "../settings/axiosSetting";
import { API_URL } from "../settings/apis";
import ToastNotification from "../components/toast";
import { usePageContext } from "./usePageContext";

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
    multipleAnswer,
    correctFeedBack,
    inCorrectFeedBack
  }: QuestionType): Promise<boolean> => {
    setIspending(true);
    const data = { question, tags, options, topic, multipleAnswer, correctFeedBack, inCorrectFeedBack };
    return axiosAuthInstance
      .post(`${API_URL.questions}`, data)
      .then((response) => {
        setIspending(false);
        setError("");
        ToastNotification({ message: "Successfull", type: "success" });
        return true;
      })
      .catch((e) => {
        setError("Ooops something went wrong!");
        setIspending(false);
        ToastNotification({ message: "Ooops", type: "error" });

        return false;
      });
  };

  const getQuestionList = async (uuid: string, questionPage: number): Promise<boolean> => {
    setIspending(true);
    setQuestions([]);
    let response = await axiosAuthInstance.get(
      `${API_URL.topics}/${uuid}/?perPage=6&page=${questionPage}`
    );

    if (response.status === 200) {
      setIspending(false);
      setQuestions(response.data.data);
      return true;
    }
    return false;
  };

  const EditQuestion = async (
    uuid: string,
    { question }: QuestionUpdateType
  ): Promise<boolean> => {
    setIspending(true);

    return axiosAuthInstance
      .put(`${API_URL.questions}/${uuid}/update`, { question: question })
      .then((res) => {
        setIspending(false);
        setError("");
        ToastNotification({ message: "Successfull", type: "success" });
        return true;
      })
      .catch((e) => {
        setIspending(false);
        setError(e.message);
        ToastNotification({ message: "Ooops something went wrong!", type: "error" });
        return false;
      });
  };

  const EditSingleOption = async (
    uuid: string,
    { option }: OptionUpdateType
  ): Promise<boolean> => {
    setIspending(true);

    return axiosAuthInstance
      .put(`${API_URL.options}/${uuid}/update`, { option: option })
      .then((res) => {
        setIspending(false);
        setError("");
        ToastNotification({ message: "Successfull", type: "success" });
        return true;
      })
      .catch((e) => {
        setIspending(false);
        setError(e.message);
        ToastNotification({
          message: "Ooops something went wrong!",
          type: "error",
        });
        return false;
      });
  };

  const DeleteQuestion = async (uuid: string): Promise<boolean> => {
    setIspending(true);
    return axiosAuthInstance
      .delete(`${API_URL.questions}/${uuid}`)
      .then((res) => {
        setIspending(false);
        setError("");
        ToastNotification({ message: "Successfull", type: "success" });
        return true;
      })
      .catch((e) => {
        setIspending(false);
        setError(e.message);
        ToastNotification({
          message: "Ooops something went wrong!",
          type: "error",
        });
        return false;
      });
  }

  return {
    createQuestion,
    EditQuestion,
    EditSingleOption,
    getQuestionList,
    setIspending,
    DeleteQuestion,
    isPending,
    error,
    setError,
    page,
    setPage,
  };
};

export default useQuestion;
