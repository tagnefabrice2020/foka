import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { Button } from "../button";
import { useLogout } from "../../hooks/useLogout";
import { usePageContext } from "../../hooks/usePageContext";
import { axiosAuthInstance } from "../../settings/axiosSetting";
import { API_URL } from "../../settings/apis";

import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled as Mstyled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import { TopicInterface } from "../../context/PageContext";
import { navigate } from "gatsby";
import { Link } from "gatsby";

const StyledBadge = Mstyled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 30,
    top: -2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const SideMenu = () => {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const { setPage, setSelectedTopic, selectedTopic, page, topics, setTopics } =
    usePageContext();

  const [loading, setLoading] = useState(true);

  const loadTopics = () => {
    setLoading(true);
    axiosAuthInstance
      .get(API_URL.topics)
      .then((r) => {
        setLoading(false);
        setTopics(r.data);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loading) {
      loadTopics();
    }
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <SideMenuContainer>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          alignItems: "center",
        }}
      >
        {topics.map((topic: any, idx: number) => (
          <StyledBadge
            color="secondary"
            max={100}
            badgeContent={topic.questions_count}
            sx={{ width: "100%" }}
            key={idx}
          >
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                padding: "0.2rem 0.5rem",
                borderRadius: "3px",
                border: "1px solid #d0d7de",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Box
                className="hide-scroll"
                sx={{
                  flexGrow: 1,
                  position: "relative",
                  overflowX: "scroll",
                  "&:hover p": { textDecoration: "underline" },
                  maxWidth: "7rem",
                  overflow: "scroll",
                }}
              >
                <Box
                  sx={{
                    minWidth: "20rem",
                    background:
                      "linear-gradient(to right, #fff 60%, transparent)",
                  }}
                >
                  <Link
                    to={`/account/questions/${topic.uuid}`}
                    style={{ fontSize: "0.8rem", fontFamily: "Roboto" }}
                  >
                    {topic.name}
                  </Link>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  right: 73,
                  width: "2rem",
                  height: "100%",
                  // background: "red",
                  background: "linear-gradient(to left, #fff 20%, transparent)",
                  top: 0,
                }}
              />

              <Box sx={{ display: "flex", columnGap: "0.5rem" }}>
                <Link to={`/account/topic/${topic.uuid}/edit`}>
                  <IconButton
                    aria-label="edit topic"
                    sx={{
                      flexBasis: "1.825rem",
                      "&:hover": {
                        background: "rgb(6, 113, 113)",
                        color:
                          selectedTopic?.uuid === topic.uuid &&
                          page === "editTopic"
                            ? "aliceblue"
                            : "black",
                      },
                      color: "black",
                      background: "rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <i
                      className="bi bi-pencil"
                      style={{ fontSize: "0.7rem" }}
                    ></i>
                  </IconButton>
                </Link>
                <Link
                  to={`/account/questions/${topic.uuid}/add`}
                  activeClassName="active"
                >
                  <IconButton
                    aria-label="add question"
                    sx={{
                      flexBasis: "1.825rem",
                      "&:hover": {
                        background: "rgb(6, 113, 113)",
                        color: "black",
                      },
                      color: "black",
                      background: "rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <i
                      className="bi bi-plus"
                      style={{ fontSize: "0.7rem" }}
                    ></i>
                  </IconButton>
                </Link>
              </Box>
            </li>
          </StyledBadge>
        ))}
      </ul>

      <div
        style={{
          flexBasis: "3.374rem",
          display: "flex",
          flexDirection: "column",
          rowGap: "0.375rem",
        }}
      >
        <Button
          style={{
            padding: "0.3rem",
            border: "1px solid #eee",
            borderRadius: "3px",
          }}
          onClick={() => setPage("addTopic")}
        >
          new set
        </Button>
        <Button
          style={{
            padding: "0.3rem",
            border: "1px solid #eee",
            borderRadius: "3px",
          }}
          onClick={() => logout()}
        >
          {t("logout")}
        </Button>
      </div>
    </SideMenuContainer>
  );
};

const QuestionCountBadge = styled.span`
  position: absolute;
  background: #000;
  color: #fff;
  padding: 0.1rem 0.5rem;
  border-radius: 100px;
  top: -0.2rem;
  left: 70%;
  transform: translate(-50%);
  font-size: small;
`;

const SideMenuContainer = styled.aside`
  position: fixed;
  top: 51px;
  width: 220px;
  height: calc(100vh - 51px);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 1rem;
  overflow: scroll;
  padding: 1rem 0.5rem;
  & > * {
    flex-basis: 100%;
  }
`;

const SideMenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
`;

export default SideMenu;
