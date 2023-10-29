import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Timer from "../../timer";
import { axiosAuthInstance } from "../../../settings/axiosSetting";
import { useQuestionContext } from "../../../hooks/useQuestionContext";
import { useTimerContext } from "../../../hooks/useTimerContext";
import { useScoreContext } from "../../../hooks/useScoreContext";
import { Button } from "../../button";
import { Input } from "../../input";

const Exercise = ({ uuid }: { uuid: string }) => {
  const {
    questions,
    setQuestions,
    subjectName,
    examName,
    answers,
    setAnswers,
  } = useQuestionContext();
  const { isPaused, setPause, setDuration, duration } = useTimerContext();
  const { showScore, setShowScore } = useScoreContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [results, setResults] = useState<any[]>([]);
  const [isEndTest, setIsEndTest] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [topic, setTopic] = useState<any>(null);

  const checkChoosenAnswer = (docId: string, optionIndex: number) => {
    const index = answers.findIndex((answer) => answer.question_id === docId);
    if (index > -1) {
      if (optionIndex === answers[index].option_id) return true;
      return false;
    }
    return false;
  };

  useEffect(() => {
    axiosAuthInstance
      .get(`/topics/${uuid}/questions?no_paginate=yes`)
      .then((res) => {
        console.log(res);
        setQuestions(res.data);
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axiosAuthInstance
      .get(`/topics/${uuid}/`)
      .then((res) => {
        setTopic(res.data);
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);

  useEffect(() => console.log(questions, loading), [loading, questions.length]);

  return (
    <main
      style={{
        marginTop: "calc(0vh + 51px)",
        // minHeight: "calc(100vh - 51px)",
      }}
    >
      <Box sx={{ maxWidth: "60rem", margin: "5rem auto" }}>
        <Box>
          <Typography variant="h4" textAlign={`center`}>
            {topic && topic.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", marginTop: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "75%",
            }}
          >
            {loading && "loading"}
            {questions.length > 0 && !loading && (
              <>
                <Box>
                  <Box
                    sx={{
                      margin: "0 auto",
                      maxWidth: "64.8rem",
                      padding: "1.6rem 2.4rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid #d1d7dc",
                    }}
                  >
                    <Typography>
                      {currentQuestionIndex + 1}/{questions.length}
                    </Typography>

                    <Box sx={{}}>
                      <Timer questionLength={questions.length} />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      margin: "0 auto",
                      maxWidth: "64.8rem",
                      padding: "0 2.4rem",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      flexDirection: "column",
                      border: "1px solid #d1d7dc",
                      width: "100%",
                      minHeight: "380px",
                    }}
                  >
                    <Box
                      sx={{
                        margin: "0 auto",
                        maxWidth: "64.8rem",
                        padding: "2.4rem 0rem",
                        width: "100%",
                      }}
                    >
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        flexDirection={"column"}
                      >
                        <Typography variant="h4">
                          Question {currentQuestionIndex + 1}:
                        </Typography>
                        <Typography
                          dangerouslySetInnerHTML={{
                            __html: questions[currentQuestionIndex].question,
                          }}
                        ></Typography>
                      </Box>
                      <br />

                      <Divider />
                      <br />
                      <Box>
                        {questions[currentQuestionIndex].multiple_answers ===
                          0 && (
                          <FormControl fullWidth>
                            <RadioGroup
                              name={`question-options${currentQuestionIndex}`}
                            >
                              {questions[currentQuestionIndex]?.options.map(
                                (option: any, idx: number) => (
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    rowGap={"4px"}
                                    columnGap={"3px"}
                                    mt={"4px"}
                                    border={"1px solid #333"}
                                    pl={1}
                                    key={idx}
                                  >
                                    <FormControlLabel
                                      value={idx}
                                      control={
                                        <Radio
                                          onChange={(
                                            event: ChangeEvent<HTMLInputElement>,
                                            checked: boolean
                                          ) => {
                                            event.target.checked = checked;
                                            let answer = {
                                              question_id:
                                                questions[currentQuestionIndex]
                                                  .id,
                                              option_id: option.id,
                                            };
                                            if (answers.length === 0) {
                                              setAnswers([...answers, answer]);
                                            } else {
                                              let checkAnswerIndex =
                                                answers.findIndex(
                                                  (answer, idx) =>
                                                    answer.question_id ===
                                                    questions[
                                                      currentQuestionIndex
                                                    ].id
                                                );
                                              if (checkAnswerIndex < 0) {
                                                setAnswers([
                                                  ...answers,
                                                  answer,
                                                ]);
                                              } else {
                                                answers.splice(
                                                  checkAnswerIndex,
                                                  1
                                                );
                                                setAnswers([
                                                  ...answers,
                                                  answer,
                                                ]);
                                              }
                                            }
                                          }}
                                          checked={checkChoosenAnswer(
                                            questions[currentQuestionIndex].id,
                                            option.id
                                          )}
                                          disabled={duration <= 0 || isPaused}
                                        />
                                      }
                                      label={option?.option_text}
                                    />
                                  </Box>
                                )
                              )}
                            </RadioGroup>
                          </FormControl>
                        )}
                        {questions[currentQuestionIndex].multiple_answers ===
                          1 && (
                          <Box>
                            <Input
                            //   defaultChecked={options[idx].isAnswer}
                              style={{ width: "fit-content" }}
                              type={`checkbox`}
                              disabled={duration <= 0 || isPaused}
        
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                console.log(
                                  options.filter(
                                    (a: any) => a.isAnswer === true
                                  )
                                );
                                const newOptions = options.map(
                                  (a: AnswerOption, index: number) => {
                                    if (!multipleAnswer) {
                                      console.log("single");
                                      if (index === idx) {
                                        onChange(e.target.checked);
                                        return { ...a, isAnswer: true };
                                      } else {
                                        return { ...a, isAnswer: false };
                                      }
                                    } else {
                                      if (index === idx) {
                                        onChange(e.target.checked);
                                        const { isAnswer } = a;

                                        return {
                                          ...a,
                                          isAnswer: !isAnswer ? false : true,
                                        };
                                      } else {
                                        return { ...a };
                                      }
                                    }
                                  }
                                );
                              }}
                              className="checkBoxRadio"
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Divider />
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        margin: "0 auto",
                        maxWidth: "64.8rem",
                        padding: "1.6rem 2.4rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid #d1d7dc",
                      }}
                    >
                      {duration > 0 && (
                        <>
                          <Button
                            style={{
                              textTransform: "initial",
                              fontWeight: "700",
                              height: "48px",
                              // borderRadius: "4px",
                              display:
                                currentQuestionIndex === 0 ? "none" : "block",
                              marginRight: "auto",
                            }}
                            onClick={() =>
                              setCurrentQuestionIndex((index) =>
                                index === 0 ? 0 : index - 1
                              )
                            }
                          >
                            <Typography fontWeight={`700`}>Previous</Typography>
                          </Button>
                          <Button
                            style={{
                              textTransform: "initial",
                              fontWeight: "700",
                              height: "48px",
                              // borderRadius: "4px",
                              display:
                                currentQuestionIndex === questions.length - 1
                                  ? "none"
                                  : "block",
                              marginLeft: "auto",
                              background:
                                answers.some(
                                  (answer) =>
                                    answer.question_id ===
                                    questions[currentQuestionIndex].id
                                ) === true
                                  ? "#23A455"
                                  : "#19743c",
                              //   "&:hover": {
                              //     background:
                              //       answers.some(
                              //         (answer) =>
                              //           answer.docId ===
                              //           questions[currentQuestionIndex].docId
                              //       ) === true
                              //         ? "#23A455"
                              //         : "#19743c",
                              //   },
                            }}
                            onClick={() =>
                              setCurrentQuestionIndex((index) =>
                                index === questions.length - 1
                                  ? index
                                  : index + 1
                              )
                            }
                          >
                            <Typography fontWeight={`700`}>
                              {answers.some(
                                (answer) =>
                                  answer.question_id ===
                                  questions[currentQuestionIndex].id
                              ) === true
                                ? "Next"
                                : "Skip Question"}
                            </Typography>
                          </Button>
                        </>
                      )}
                      <Button
                        style={{
                          textTransform: "initial",
                          fontWeight: "700",
                          height: "48px",
                          // borderRadius: "4px",
                          display:
                            currentQuestionIndex === questions.length - 1 ||
                            duration <= 0
                              ? "block"
                              : "none",
                          marginLeft: "auto",
                          background: "#072312",
                          border: "1px solid #072312",
                          //   "&:hover": {
                          //     background: "#072312",
                          //     outline: "2px solid #19743c",
                          //   },
                        }}
                        onClick={() => {
                          setPause(true);
                          setShowScore(false);
                          setIsEndTest(true);
                        }}
                      >
                        <Typography fontWeight={`700`} fontSize={`16px`}>
                          Get Results
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
          <Box
            sx={{
              flexBasis: "25%",
              border: "1px solid #d1d7dc",
              padding: "0.5rem 0.3rem",
            }}
          >
            <Typography
              variant="caption"
              fontWeight={`bold`}
              textAlign={`center`}
              display={`block`}
              padding="0.5rem "
            >
              Indicators
            </Typography>
            <Divider />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 30px)",
                padding: "0.5rem",
                gap: "0.5rem",
                marginTop: "0.5rem",
                // gridTemplateRows: "repeat(auto-fit, minmax(20px, 1fr))",
              }}
            >
              {questions.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    border: "1px solid #d1d7dc",
                    borderRadius: "100px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    background:
                      currentQuestionIndex === index ? "#ddd" : "#fff",
                    color: currentQuestionIndex === index ? "#fff" : "#000",
                  }}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  <Typography variant="caption">{index + 1}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default Exercise;
