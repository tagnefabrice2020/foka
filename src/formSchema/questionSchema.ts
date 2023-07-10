import { array, boolean, number, object, string } from "yup";

export const QuestionSchema = object({
  subject: string().required(),
  question: string().required().min(2),
  options: array()
    .of(
      object().shape({
        isAnswer: boolean(),
        option: string().min(2),
      })
    )
    .required()
    .min(2)
    .max(4),
  topics: array()
    .of(
      object().shape({
        key: number().integer(),
        label: string().required().min(2),
      })
    )
    .required()
    .min(1),
  exam: string().required(),
});
