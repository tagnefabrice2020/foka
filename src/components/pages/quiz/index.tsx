import React, { useState } from "react";
import AddQuestion from "./add";
import Layout from "../../layout";
import { styled } from "styled-components";

const Question = () => {
  const [section, setSection] = useState("addQuestion");

  return (
    <Layout>
      <MainSection>{section === "addQuestion" && <AddQuestion />}</MainSection>
    </Layout>
  );
};

const MainSection = styled.section`
  margin-left: 220px;
  margin-top: 51px;
  padding: 0.2rem 0.275rem;
  height: calc(100vh - 51px);
`;

export default Question;
