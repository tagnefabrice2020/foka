import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Timer from "../../components/timer";
import { axiosAuthInstance } from "../../settings/axiosSetting";
import {
  ScoreContext,
  TimerContext,
  QuestionContext,
} from "../../context/TimerContext";
import Layout2 from "../../components/layout2";
import { useQuestionContext } from "../../hooks/useQuestionContext";
import { graphql } from "gatsby";
import Exercise from "../../components/pages/exercise";

const ExercisePage = (props: any) => {
  return (
    <Layout2>
      <Exercise uuid={props["*"]} />
    </Layout2>
  );
};

export default ExercisePage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
