import React, { useEffect, useState } from "react";
import AddQuestion from "./add";
import { styled } from "styled-components";
import DashboardLayout from "../../dashboadLayout";
import Topic from "../topic";
import { usePageContext } from "../../../hooks/usePageContext";
import QuestionList from "./list";
import EditTopic from "../topic/edit";

const Question = () => {
  const { page } = usePageContext();

  return (
    <DashboardLayout>
      <MainSection>
        {page === "addQuestion" && <AddQuestion />}
        {page === "addTopic" && <Topic />}
        {page === "questionList" && <QuestionList />}
        {page === "editTopic"  && <EditTopic />}
      </MainSection>
    </DashboardLayout>
  );
};

const MainSection = styled.section`
  margin-left: 220px;
  margin-top: 51px;
  padding: 0.2rem 0.275rem;
  height: calc(100vh - 51px);
`;

export default Question;
