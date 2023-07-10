import { useState } from "react";
import { TopicType } from "../formSchema/topicSchema";
import { axiosAuthInstance } from "../settings/axiosSetting";
import { API_URL } from "../settings/apis";

const useTopic = () => {
  const [loadingAllTopics, setLoadingAllTopics] = useState<boolean>(true);

  const [creatingTopic, setCreatingTopic] = useState<boolean>(false);

  const [loadingSingleTopic, setLoadingSingleTopic] = useState<boolean>(false);

  const [updatingSingleTopic, setupdatingSingleTopic] =
    useState<boolean>(false);

  const getAllTopics = async () => {};

  const createTopic = async ({ name, type, tags, description }: TopicType): Promise<boolean> => {
    let data = { name, type, tags, description };
    setCreatingTopic(true);
    
    return await axiosAuthInstance
      .post(API_URL.topics, data)
      .then((r) => {
        console.log(r);
          setCreatingTopic(false);
          return true;
      })
        .catch((e) => {
            setCreatingTopic(false);
            return false;
        });
  };

  const readSingleTopic = async () => {};

  const updateTopic = async () => {};

  const deleteTopic = async () => {};

  return {
    getAllTopics,
    createTopic,
    readSingleTopic,
    updateTopic,
    deleteTopic,

    loadingAllTopics,
    creatingTopic,
    loadingSingleTopic,
    updatingSingleTopic,

    setLoadingAllTopics,
    setCreatingTopic,
    setLoadingSingleTopic,
    setupdatingSingleTopic,
  };
};

export default useTopic;
