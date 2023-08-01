import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import { Input } from "../../../input";
import CheckBox from "../../../customCheckBox";
import { Button } from "../../../button";
import Divider from "../../../divider";
import { TextArea } from "../../../textarea";
import { Controller, useFieldArray } from "react-hook-form";
import useFormValidation from "../../../../hooks/useFormValidation";
import { AnswerOption, QuestionSchema } from "../../../../formSchema/questionSchema";
import ErrorFormMessage from "../../../errors/formMessage";
import QuizPageHeader from "../../../quizPageHeader";
import Chip from "../../../chip";
import { usePageContext } from "../../../../hooks/usePageContext";
import useQuestion from "../../../../hooks/useQuestion";


const AddQuestion: React.FC = () => {
  const { selectedTopic } = usePageContext();
  const { createQuestion } = useQuestion();
  const initialValues = {
    question: "",
    options: [
      { isAnswer: false, option: "" },
      { isAnswer: false, option: "" },
    ],
    tags: [],
    topic: selectedTopic?.uuid,
  };

  const radioRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    console.log(errors)
  });
  

  const tagRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = async (formData: any) => {
    let action = await createQuestion(formData);
    if (action) {
      reset();
      setTags([]);
    }
  };

    const [tags, setTags] = useState<string[]>([]);


  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputElement = e.target as HTMLInputElement;
      const data = {
        text: inputElement.value,
        index: tags?.length,
      };

      setTags((prev: any) => {
        if (prev.length === 0) {
          setError("Tags", { type: "required", message: "No tag selected" });
        } else {
          clearErrors("tags");
        }
        setValue("tags", [
          ...prev.map((e: any) => e?.text),
          data.text,
        ] as unknown as never[]);
        return [...prev, { ...data }];
      });
      setValue("tags", "" as unknown as never[]);
      if (tagRef.current && tagRef.current.value) {
        tagRef.current.value = "";
      }
    }
  };

  const removeTags = (index: number) => {
    const newTags = tags.filter((tag: any) => tag.index !== index);

    setTags((prevTags: any) => {
      if (newTags.length === 0) {
        setError("Tags", { type: "required", message: "No tag selected" });
      } else {
        setValue("tags", [
          ...newTags.map((e: any) => e.text),
        ] as unknown as never[]);
        clearErrors("tag");
      }
      return newTags;
    });
  };

  const resetCheckBoxes = (index?: number) => {
    radioRefs.current.forEach((el: HTMLInputElement, elIndex: number) => {
      if (!index && elIndex !== index) {
        el.checked = false;
      }
    });
  };

  const { control, errors, getValues, setValue, handleSubmit, reset, watch, setError, clearErrors } =
    useFormValidation(initialValues, QuestionSchema, handleOnSubmit);

  const options = watch("options");

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "options", // unique name for your Field Array
    }
  );

  return (
    <div>
      <QuizPageHeader questionNumber="1" />
      <div style={{ padding: "1rem" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(handleOnSubmit);
          }}
          style={{ display: "flex", flexDirection: "column", rowGap: "2.4rem" }}
        >
          <div>
            <p style={{ color: "rgb(101, 109, 118)", fontSize: "1.5rem" }}>
              Question
            </p>
            <Controller
              name="question"
              control={control}
              render={({ field: { onChange, name } }) => (
                <Input placeholder="Question" name={name} onChange={onChange} />
              )}
            />
            {errors.question && (
              <ErrorFormMessage message={errors.question.message} />
            )}
          </div>

          <div>
            <p style={{ color: "rgb(101, 109, 118)", fontSize: "1.5rem" }}>
              Tags
            </p>

            <Input
              placeholder="tags"
              ref={tagRef}
              onKeyDown={(e: any) => addTags(e)}
            />
            <div
              style={{
                display: "flex",
                columnGap: "0.5rem",
                rowGap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {tags.map((tag: any, index: number) => {
                return (
                  <Chip
                    key={index}
                    label={tag?.text}
                    onDelete={() => removeTags(tag.index)}
                  />
                );
              })}
            </div>
            {errors.tags && <ErrorFormMessage message={errors.tags.message} />}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
          >
            {fields.map((field, idx) => (
              <div
                style={{
                  display: "flex",
                  columnGap: "0.4rem",
                  alignItems: "center",
                }}
                key={field.id}
              >
                {/* <CheckBox checked={true} /> */}
                <Controller
                  control={control}
                  name={`options.${idx}.isAnswer`}
                  render={({ field: { onChange, name } }) => {
                    return (
                      <Input
                        name={name}
                        defaultChecked={options[idx].isAnswer}
                        style={{ width: "fit-content" }}
                        type={`checkbox`}
                        ref={(el: HTMLInputElement) =>
                          (radioRefs.current[idx] = el)
                        }
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const newOptions = options.map(
                            (a: AnswerOption, index: number) => {
                              if (index === idx) {
                                onChange(e.target.checked);
                                return { ...a, isAnswer: true };
                              } else {
                                return { ...a, isAnswer: false };
                              }
                            }
                          );

                          setValue("options", newOptions, {
                            shouldValidate: true,
                          });
                        }}
                        className="checkBoxRadio"
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name={`options.${idx}.option`}
                  render={({ field: { name } }) => (
                    <div style={{ width: "100%" }}>
                      <Input
                        name={name}
                        style={{ padding: "12px", borderRadius: "4px" }}
                        defaultValue={options[idx].option || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setValue(`options.${idx}.option`, e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                        className={`${
                          errors.options && errors?.options[idx]?.option
                            ? "form-error"
                            : ""
                        }`}
                      />
                      {errors?.options && errors?.options[idx]?.option && (
                        <ErrorFormMessage
                          message={errors?.options[idx].option?.message ?? ""}
                        />
                      )}
                    </div>
                  )}
                />
                <Button
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    borderRadius: "2px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  type="button"
                  className="error"
                  disabled={options.length <= 2}
                  onClick={() => {
                    remove(idx);
                  }}
                >
                  <i className="bi bi-x"></i>
                </Button>
              </div>
            ))}
          </div>
          {errors.options && (
            <ErrorFormMessage message={errors.options.message} />
          )}
          <div
            style={{
              display: "flex",
              columnGap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => {
                append({ isAnswer: false, option: "" });
              }}
              type="button"
              disabled={fields.length === 5}
            >
              <i className="bi bi-plus"></i>
            </Button>
            <p>Add new option</p>
          </div>

          <div>
            <Divider />
          </div>
          <FeedBackContainer>
            <FeedbackGridElement>
              <h4>Correct Feedback</h4>
              <TextArea style={{ minHeight: "5rem" }}></TextArea>
            </FeedbackGridElement>
            <FeedbackGridElement>
              <h4>Incorrect Feedback</h4>
              <TextArea style={{ minHeight: "5rem" }}></TextArea>
            </FeedbackGridElement>
          </FeedBackContainer>

          <div>
            <Divider />
            <div
              style={{
                width: "500px",
                minWidth: "320px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                columnGap: "0.5rem",
                marginTop: "2rem",
              }}
            >
              <Button $primary type="submit">
                Save
              </Button>
              <Button $secondary onClick={() => reset()}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const PageTitleBar = styled.div`
  display: flex;
  column-gap: 1rem;
  padding: 0.275rem;
  height: 2.5rem;
  border-bottom: 1px solid #eee;
  & > div:first-of-type {
    border-right: 1px solid #eee;
  }
`;

const IDContainer = styled.div`
  padding: 0.2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IDContainerTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageMenuContainer = styled.div`
  height: 40px;
  display: inline-block;
  width: 100%;
  overflow: scroll;
`;

const PageMenu = styled.div`
  display: flex;
  justify-content: space-between;
  height: inherit;
  padding: 0 0.275rem;
  border-bottom: 1px solid #eee;
`;

const QuestionType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    height: 15px;
    border: 1px solid #eee;
    right: -20px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  align-items: center;
`;

const Action = styled.div`
  background: #eee;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-radius: 50px;
  cursor: pointer;
  padding: 0 1rem;
  & > * {
    font-size: 1rem;
  }
`;

const QuestionBankTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    height: 15px;
    border: 1px solid #eee;
    left: -20px;
  }
`;

const FeedBackContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  column-gap: 0.8rem;
`;

const FeedbackGridElement = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export default AddQuestion;
