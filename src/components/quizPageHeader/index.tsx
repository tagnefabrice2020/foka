import React from "react";
import styled from "styled-components";
import { usePageContext } from "../../hooks/usePageContext";

type Props = {
  questionType?: string;
    questionTopic
    ?: string;
  questionNumber?: string;
};

const QuizPageHeader = ({
  questionType = "Mutiple Choice Question",
  questionTopic = "Quiz",
  questionNumber,
}: Props) => {
  const { setPage, selectedTopic } = usePageContext();
  return (
    <>
      <PageTitleBar>
        {questionNumber && (
          <IDContainer>
            <p>{questionNumber}</p>
          </IDContainer>
        )}
        <IDContainerTitle
          style={{
            padding: !questionNumber ? "0.2rem 1rem" : 0,
          }}
        >
          <p>{questionTopic}</p>
        </IDContainerTitle>
      </PageTitleBar>
      <PageMenuContainer>
        <PageMenu>
          <QuestionType>
            <p>{questionType}</p>
          </QuestionType>
          <ActionsContainer>
            <Action onClick={() => setPage("questionList")}>
              <p>Questions</p>
            </Action>
            <Action onClick={() => setPage("addQuestion")}>
              <i className="bi bi-plus"></i>
            </Action>
          </ActionsContainer>
          <QuestionBankTextContainer>
            <p>Question Bank</p>
          </QuestionBankTextContainer>
        </PageMenu>
        {/* form */}
      </PageMenuContainer>
    </>
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

export default QuizPageHeader;
