import React, { useRef, useState, useEffect } from "react";
import { styled } from "styled-components";
import useFormValidation from "../../../hooks/useFormValidation";
import { TopicSchema, TopicType } from "../../../formSchema/topicSchema";
import { Controller } from "react-hook-form";
import { Input } from "../../input";
import ErrorFormMessage from "../../errors/formMessage";
import { Select } from "../../select";
import { Button } from "../../button";
import Divider from "../../divider";
import Chip from "../../chip";
import useTopic from "../../../hooks/useTopic";
import ToastNotification from "../../toast";

const Topic = () => {
  const initV = {
    name: "",
    description: "",
    type: "mcq"
  };

  const { createTopic } = useTopic();

  const tagRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = async (formData: TopicType) => {
    const action = await createTopic(formData);
    console.log(action);
    if (action) {
      setTags([]);
      reset({
        name: "",
        description: "",
        type: "mcq",
      });
      if (tagRef.current && tagRef.current.value) {
        tagRef.current.value = "";
      }
      if (nameRef.current && nameRef.current.value) {
        nameRef.current.value = "";
      }
      if (descriptionRef.current && descriptionRef.current.value) {
        descriptionRef.current.value = "";
      }
      ToastNotification({ message: "Successfull", type: "success" });
    } else {
      ToastNotification({ message: "Error", type: "error" });
    }
  };

  const {
    control,
    errors,
    getValues,
    setValue,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
  } = useFormValidation(initV, TopicSchema, handleOnSubmit);

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

  return (
    <div>
      <PageTitleBar>
        <IDContainerTitle>
          <p>New set of questions</p>
        </IDContainerTitle>
      </PageTitleBar>

      <div style={{ padding: "1rem" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(handleOnSubmit);
          }}
          style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
        >
          <div>
            <p style={{ color: "rgb(101, 109, 118)", fontSize: "1.5rem" }}>
              Name
            </p>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, name } }) => (
                <Input
                  placeholder="Question"
                  name={name}
                  onChange={onChange}
                  ref={nameRef}
                />
              )}
            />
            {errors.name && <ErrorFormMessage message={errors.name.message} />}
          </div>
          <div>
            <p style={{ color: "rgb(101, 109, 118)", fontSize: "1.5rem" }}>
              Type
            </p>
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, name } }) => (
                <Select name={name} onChange={onChange}>
                  <option value={`mcq`}>MCQ</option>
                  {/* <option value={`question_answer`}>Question Answer</option> */}
                </Select>
              )}
            />
            {errors.type && <ErrorFormMessage message={errors.type.message} />}
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
          <div>
            <p style={{ color: "rgb(101, 109, 118)", fontSize: "1.5rem" }}>
              Description
            </p>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, name } }) => (
                <Input
                  placeholder="description"
                  name={name}
                  onChange={onChange}
                  ref={descriptionRef}
                />
              )}
            />
            {errors.description && (
              <ErrorFormMessage message={errors.description.message} />
            )}
          </div>
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

export default Topic;
