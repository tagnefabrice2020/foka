import { array, boolean, object, string } from "yup";

export const TopicSchema = object().shape({
  name: string().required(),
  type: string().required(),
  tags: array().of(string()).required().min(2).max(4),
  description: string(),
});

export type TopicType = {
  name: string;
  type: string;
  tags: string[];
  description: string;
};
