import { useState } from "react";
import { TopicType } from "../formSchema/topicSchema";
import { axiosAuthInstance } from "../settings/axiosSetting";
import { API_URL } from "../settings/apis";
import { usePageContext } from "./usePageContext";

const useTopic = () => {
  const [loadingAllTopics, setLoadingAllTopics] = useState<boolean>(true);

  const [creatingTopic, setCreatingTopic] = useState<boolean>(false);

  const [loadingSingleTopic, setLoadingSingleTopic] = useState<boolean>(false);

  const [updatingSingleTopic, setUpdatingSingleTopic] =
    useState<boolean>(false);
  
  const { selectedTopic } = usePageContext();

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

  const updateTopic = async ({
    name,
    type,
    tags,
    description,
  }: TopicType) => {
    let data = { name, type, tags, description };
    setUpdatingSingleTopic(true);

    return await axiosAuthInstance
      .patch(API_URL.topics + "/" + selectedTopic?.uuid, data)
      .then((r) => {
        console.log(r);
        setUpdatingSingleTopic(false);
        return true;
      })
      .catch((e) => {
        setUpdatingSingleTopic(false);
        return false;
      });
  };

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
    setUpdatingSingleTopic,
  };
};

export default useTopic;
