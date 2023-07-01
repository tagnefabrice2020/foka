import React from "react";
import { styled } from "styled-components";
import { Input } from "../../../input";
import CheckBox from "../../../customCheckBox";
import { Button } from "../../../button";
import Divider from "../../../divider";
import { TextArea } from "../../../textarea";

const AddQuestion: React.FC = () => {
  return (
    <div>
      <PageTitleBar>
        <IDContainer>
          <p>1</p>
        </IDContainer>
        <IDContainerTitle>
          <p>Quiz</p>
        </IDContainerTitle>
      </PageTitleBar>
      <PageMenuContainer>
        <PageMenu>
          <QuestionType>
            <p>Mutiple Choice Question</p>
          </QuestionType>
          <ActionsContainer>
            <Action>
              <p>Questions</p>
            </Action>
            <Action>
              <i className="bi bi-plus"></i>
            </Action>
          </ActionsContainer>
          <QuestionBankTextContainer>
            <p>Question Bank</p>
          </QuestionBankTextContainer>
        </PageMenu>

        {/* form */}
      </PageMenuContainer>
      <div style={{ padding: "1rem" }}>
        <form
          onSubmit={() => null}
          style={{ display: "flex", flexDirection: "column", rowGap: "2.4rem" }}
        >
          <div>
            <p style={{ color: "rgb(101, 109, 118)", fontSize: "1.5rem" }}>
              Question
            </p>
            <Input placeholder="Question" />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                columnGap: "0.4rem",
                alignItems: "center",
              }}
            >
              <CheckBox checked={true} />
              <Input placeholder="Option" />
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "red",
                  color: "#fff",
                  fontSize: "1.5rem",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                <i className="bi bi-x"></i>
              </div>
            </div>
          </div>

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
                marginTop: "2rem"
              }}
            >
              <Button $primary>Save</Button>
              <Button $secondary>Cancel</Button>
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
