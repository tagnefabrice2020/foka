import { array, boolean, number, object, string } from "yup";

export const QuestionSchema = object({
  question: string().required().min(2),
  options: array()
    .of(
      object().shape({
        isAnswer: boolean(),
        option: string().required().min(1),
      })
    )
    .required()
    .min(2)
    .max(5)
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
  tags: array().of(string()).required().min(1),
  multipleAnswer: boolean().default(false),
  correctFeedBack: string(),
  inCorrectFeedBack: string(),
  topic: string(),
});

export type AnswerOption = {
  isAnswer: boolean | undefined;
  option: string;
};

export type QuestionType = {
  question: string;
  options: AnswerOption[];
  tags: string[];
  topic: string | undefined;
  multipleAnswer: boolean;
  correctFeedBack: string;
  inCorrectFeedBack: string;
};

export type QuestionUpdateType = {
  question?: string;
  options?: AnswerOption[];
  tags?: string[];
  topic?: string | undefined;
  multipleAnswer?: boolean;
  correctFeedBack?: string;
  inCorrectFeedBack?: string;
};

export type OptionUpdateType = {
  option?: string;
  isAnswer?: boolean;
};
