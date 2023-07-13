import React from "react";
import QuizPageHeader from "../../../quizPageHeader";
import { Input } from "../../../input";

const QuestionList = () => {
  return (
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
          <div style={{ width: "20rem" }}>
            <Input />
          </div>
        </div>
        <div style={{ marginTop: "1.5rem", padding: "2rem" }}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <td></td>
                <td>Question</td>
                <td>Nº options</td>
                <td>Nº Tags</td>
                <td>Created At</td>
                <td></td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
