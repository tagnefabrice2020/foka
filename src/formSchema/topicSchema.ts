import { array, object, string } from "yup";

export const TopicSchema = object().shape({
  name: string().required(),
  type: string().required(),
  tags: array().of(string().required()).min(2).max(4).default([]),
  description: string(),
});

export type TopicType = {
  name: string;
  type: string;
  tags: any[];
  description: string;
};
