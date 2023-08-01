import { array, boolean, number, object, string } from "yup";

export const QuestionSchema = object({
  question: string().required().min(2),
  options: array()
    .of(
      object().shape({
        isAnswer: boolean(),
        option: string().required().min(2),
      })
    )
    .required()
    .min(2)
    .max(4)
    .test(
      "atLeastOneTrue",
      "At least one option must be marked as true.",
      function (options) {
        const atLeastOneTrue = options.some(
          (option) => option.isAnswer === true
        );
        return atLeastOneTrue;
      }
    ),
  tags: array()
    .of(
      string()
    )
    .required()
    .min(1)
});

export type AnswerOption = {
  isAnswer: boolean | undefined;
  option: string;
};

export type QuestionType = {
  question: string;
  options: AnswerOption[];
  tags: string[];
  topic: number
};
