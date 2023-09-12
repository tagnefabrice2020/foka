import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuizPageHeader from "../../../quizPageHeader";
import { Input } from "../../../input";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Modal,
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { axiosAuthInstance } from "../../../../settings/axiosSetting";
import { API_URL } from "../../../../settings/apis";
import { usePageContext } from "../../../../hooks/usePageContext";
import DashboardLayout from "../../../dashboadLayout";
import {
  ArrowBack,
  ArrowForward,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { object, string } from "yup";
import useFormValidation from "../../../../hooks/useFormValidation";
import ErrorFormMessage from "../../../errors/formMessage";
import { Button } from "../../../button";
import useQuestion from "../../../../hooks/useQuestion";
import { Option, Question } from "../../../../context/PageContext";

const QuestionList = ({ uuid }: any) => {
  const {
    selectedTopic,
    questionPage,
    setQuestionPage,
    questions,
    setQuestions,
    totalQuestionPages,
    setTotalQuestionPages,
  } = usePageContext();

  const [mounted, setMounted] = useState<boolean>(true);

  const [data, setData] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = () => {
    setQuestions([]);
    axiosAuthInstance
      .get(`${API_URL.topics}/${uuid}/questions?perPage=6&page=${questionPage}`)
      .then((response) => {
        const data = response.data;
        setQuestions(data.data);
        setTotalQuestionPages(data.last_page);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setMounted(true);
  }, [uuid, questionPage]);

  useEffect(() => {
    if (mounted && loading) loadData();
    return () => {
      setMounted(false);
    };
  }, [loading, mounted, questionPage]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setQuestionPage(page);
  };

  return (
    <DashboardLayout>
      <div>
        <QuizPageHeader />
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <div style={{ width: "20rem", padding: "2rem 2rem 0" }}>
              <Input />
            </div>
          </div>
          <div style={{ padding: "2rem" }}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Question</TableCell>
                    <TableCell align="center">Nunber of options</TableCell>
                    <TableCell align="center">Number of Tags</TableCell>
                    <TableCell align="right">Created At</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((row, idx) => (
                    <Row key={idx} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={4}>
              <Pagination
                sx={{ width: "fit-content", margin: "auto" }}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBack, next: ArrowForward }}
                    {...item}
                  />
                )}
                count={totalQuestionPages}
                page={questionPage}
                onChange={handlePageChange}
              />
            </Box>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

function createData({ uuid, question, tags, created_at, options }: Question) {
  return {
    uuid,
    question,
    tags,
    created_at,
    options,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [selectOptionUuid, setSelectedOptionUuid] = useState<string>("");
  const [selectedQuestionUuid, setSelectedQuestionUuid] = useState<string>("");

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.question}
        </TableCell>
        <TableCell align="center">{row.options.length}</TableCell>
        <TableCell align="center">{row.tags.split("-").length}</TableCell>
        <TableCell align="right">{row.created_at}</TableCell>
        <TableCell align="right">
          <Box>
            <IconButton
              onClick={() => {
                setOpenQuestionModal(true);
                setSelectedQuestionUuid(row.uuid);
              }}
            >
              <i className="bi bi-pencil" style={{ fontSize: "0.7rem" }}></i>
            </IconButton>
            <IconButton>
              <i className="bi bi-trash" style={{ fontSize: "0.7rem" }}></i>
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Options
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Option</TableCell>
                    <TableCell align="center">Is answer</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.options.map((option: Option, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {option.option_text}
                      </TableCell>
                      <TableCell align="center">
                        {option.is_correct ? (
                          <IconButton
                            sx={{
                              background: "#0080006b",
                              border: "1px solid green",
                              "&:hover": { background: "unset" },
                            }}
                          >
                            <i
                              className="bi bi-check"
                              style={{ fontSize: "0.7rem" }}
                            ></i>
                          </IconButton>
                        ) : (
                          <IconButton
                            sx={{
                              background: "#f009",
                              border: "1px solid #f009",
                              "&:hover": { background: "unset" },
                            }}
                          >
                            <i
                              className="bi bi-x"
                              style={{ fontSize: "0.7rem" }}
                            ></i>
                          </IconButton>
                        )}
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedOptionUuid(option.uuid);
                          }}
                        >
                          <i
                            className="bi bi-pencil"
                            style={{ fontSize: "0.7rem" }}
                          ></i>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {openModal && (
        <EditOptionModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          uuid={selectOptionUuid}
          setSelectedOption={setSelectedOptionUuid}
        />
      )}
      {openQuestionModal && (
        <EditQuestionModal
          openModal={openQuestionModal}
          setOpenModal={setOpenQuestionModal}
          uuid={selectedQuestionUuid}
          setSelectedOption={setSelectedQuestionUuid}
        />
      )}
    </>
  );
}

function EditOptionModal({
  uuid,
  openModal,
  setOpenModal,
  setSelectedOption,
}: {
  uuid: string;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}) {
  const handleClose = () => {
    setOpenModal(false);
    setSelectedOption("");
  };

  const initialValues = {
    option: "",
    uuid: uuid,
  };

  const OptionSchema = object({
    option: string().required(),
    uuid: string().required(),
  });

  const [loading, setLoading] = useState<boolean>(true);

  const { questions, setQuestions } = usePageContext();

  const { EditSingleOption } = useQuestion();

  useEffect(() => {
    function getOption() {
      axiosAuthInstance
        .get(`${API_URL.options}/${uuid}/`)
        .then((response) => {
          const option = response.data;
          setLoading(false);
          setValue("option", option.option_text, { shouldValidate: true });
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
    if (openModal) getOption();
  }, [uuid, openModal]);

  const handleOnSubmit = async (formData: { option: string }) => {
    const res = await EditSingleOption(uuid, { option: formData.option });

    if (res) {
      // update in state and close modal.
      let questionsCopy = questions;
      let questionIndex = -1;

      questionsCopy.forEach((question: Question, idx: number) => {
        let option = question.options.some(
          (option: Option) => option.uuid === uuid
        );
        if (option) {
          questionIndex = idx;
          return false;
        }
      });

      let question = questionsCopy.splice(questionIndex, 1);
      let newOptions = question[0].options.map((option: Option) =>
        option.uuid === uuid
          ? { ...option, option_text: formData.option }
          : { ...option }
      );

      questionsCopy.splice(questionIndex, 1, {
        ...question[0],
        options: newOptions,
      });

      setQuestions([...questionsCopy]);

      handleClose();
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
  } = useFormValidation(initialValues, OptionSchema, handleOnSubmit);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ maxWidth: "50rem", background: "#fff", margin: "5rem auto" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              Edit option
            </Typography>
            <i className="bi bi-x-lg cursor-pointer" onClick={handleClose}></i>
          </Box>
          <Divider />
          <Box sx={{ padding: 2 }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1.5rem",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(handleOnSubmit);
              }}
            >
              <div>
                <Typography
                  style={{ color: "rgb(101, 109, 118)" }}
                  variant="caption"
                >
                  Option
                </Typography>
                <Controller
                  name="option"
                  control={control}
                  render={({ field: { onChange, name } }) => (
                    <Input
                      placeholder="Option"
                      name={name}
                      onChange={onChange}
                      defaultValue={getValues().option}
                    />
                  )}
                />
                {errors.option && (
                  <ErrorFormMessage message={errors.option.message} />
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
                  <Button $secondary onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

function EditQuestionModal({
  uuid,
  openModal,
  setOpenModal,
  setSelectedOption,
}: {
  uuid: string;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}) {
  const handleClose = () => {
    setOpenModal(false);
    setSelectedOption("");
  };

  const initialValues = {
    question: "",
    uuid: uuid,
  };

  const { questions, setQuestions } = usePageContext();

  const { EditQuestion } = useQuestion();

  const QuestionSchema = object({
    question: string().required(),
    uuid: string().required(),
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    function getQuestion() {
      axiosAuthInstance
        .get(`${API_URL.questions}/${uuid}/`)
        .then((response) => {
          const question = response.data;

          setLoading(false);
          setValue("question", question.question, { shouldValidate: true });
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
    if (openModal) getQuestion();
  }, [uuid, openModal]);

  const handleOnSubmit = async (formData: { question: string }) => {
    const res = await EditQuestion(uuid, { question: formData.question });

    if (res) {
      // update in state and close modal.
      let questionCopy = questions;

      let questionIndex = questionCopy.findIndex(
        (question: Question) => question.uuid === uuid
      );

      let question = questionCopy.splice(questionIndex, 1);

      question[0].question = formData.question;

      questionCopy.splice(questionIndex, 0, question[0]);

      setQuestions([...questionCopy]);

      handleClose();
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
  } = useFormValidation(initialValues, QuestionSchema, handleOnSubmit);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ maxWidth: "50rem", background: "#fff", margin: "5rem auto" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              Edit Question
            </Typography>
            <i className="bi bi-x-lg cursor-pointer" onClick={handleClose}></i>
          </Box>
          <Divider />
          <Box sx={{ padding: 2 }}>
            {!loading && (
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1.5rem",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(handleOnSubmit);
                }}
              >
                <div>
                  <Typography
                    style={{ color: "rgb(101, 109, 118)" }}
                    variant="caption"
                  >
                    Question
                  </Typography>
                  <Controller
                    name="question"
                    control={control}
                    render={({ field: { onChange, name } }) => (
                      <Input
                        placeholder="Question"
                        name={name}
                        onChange={onChange}
                        defaultValue={getValues().question}
                      />
                    )}
                  />
                  {errors.question && (
                    <ErrorFormMessage message={errors.question.message} />
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
                    <Button $secondary onClick={handleClose}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default QuestionList;
