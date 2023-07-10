import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { Button } from "../button";
import { useLogout } from "../../hooks/useLogout";
import { usePageContext } from "../../hooks/usePageContext";
import { axiosAuthInstance } from "../../settings/axiosSetting";
import { API_URL } from "../../settings/apis";

const SideMenu = () => {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const { setPage } = usePageContext();

  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  const loadTopics = () => {
    setLoading(true);
    axiosAuthInstance
      .get(API_URL.topics)
      .then((r) => {
        console.log(r);
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
          // <SideMenuContent>
          <li
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              padding: "0.4rem 0.5rem",
              borderRadius: "3px",
              border: "1px solid #eee",
            }}
            key={idx}
          >
            <p>{topic.name}</p> <span>230</span>
            <button onClick={() => { console.log('dsds'); setPage("addQuestion");}}>
              <i className="bi bi-plus"></i>
            </button>
          </li>
          // </SideMenuContent>
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
