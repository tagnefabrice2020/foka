import React, { useEffect, useState } from "react";
import QuizPageHeader from "../../../quizPageHeader";
import { Input } from "../../../input";
import { Typography } from "@mui/material";
import { axiosAuthInstance } from "../../../../settings/axiosSetting";
import { API_URL } from "../../../../settings/apis";
import { usePageContext } from "../../../../hooks/usePageContext";
import DashboardLayout from "../../../dashboadLayout";

const QuestionList = ({uuid}: any) => {
  const { selectedTopic } = usePageContext();

  const [page, setPage] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(true);

  const [data, setData] = useState<any[]>([]);

  const loadData = () => {
    setData([]);
    axiosAuthInstance
      .get(
        `${API_URL.topics}/${uuid}/questions?perPage=10&page=${page}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (mounted) loadData();
    return () => {
      setMounted(false);
    };
  }, [selectedTopic?.uuid]);

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
            <div style={{ width: "20rem" }}>
              <Input />
            </div>
          </div>
          <div style={{ marginTop: "1.5rem", padding: "2rem" }}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <td></td>
                  <td>
                    <Typography variant="caption">Question</Typography>
                  </td>
                  <td>
                    <Typography variant="caption">Nº options</Typography>
                  </td>
                  <td>
                    <Typography variant="caption">Nº Tags</Typography>
                  </td>
                  <td>
                    <Typography variant="caption">Created At</Typography>
                  </td>
                  <td></td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QuestionList;
