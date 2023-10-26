import React, { useEffect, useMemo, useRef, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Input } from "../components/input";
import { axiosInstance } from "../settings/axiosSetting";
import { MoreVertRounded } from "@mui/icons-material";
import { Link } from "gatsby-plugin-react-i18next";

const ITEM_HEIGHT = 48;

const IndexPage: React.FC<PageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [isScrolling, setIsScrolling] = useState(true);
  const [topics, setTopics] = useState<any[]>([]);
  // https://stackoverflow.com/questions/53800162/getting-url-parameters-on-gatsbyjs

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const modalRef = useRef<HTMLElement[]>([]);

  const fetchMoreData = async () => {
    try {
      // Make an API request to fetch more data
      const response = await axiosInstance.get(
        `/topicList?page=${page}&per_page=${perPage}`
      );
      // Append the new data to the existing items
      setTopics(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const topics = useMemo(() => fetchQuestions(), [isScrolling]);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const Footer = () => {
    return (
      <div
        style={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  };

  return (
    <Layout>
      <main
        style={{
          marginTop: "calc(0vh + 51px)",
          // minHeight: "calc(100vh - 51px)",
        }}
      >
        <Box sx={{ background: "#eee", height: "5rem", width: "100%" }}>
          <Box
            style={{
              height: "100%",
              position: "relative",
              padding: 1,
              width: "90%",
              margin: "auto",
            }}
          >
            <Input
              style={{
                maxWidth: "400px",
                borderRadius: "100px",
                padding: "0.5rem 1rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            margin: "auto",
            maxWidth: "calc((1100 / 16) * 1rem)",
            marginTop: "1rem",
            padding: 1,
          }}
        >
          <Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Popular question sets
              </Typography>
            </Box>
            <Box
              sx={{
                maxHeight: "calc((100vh - 250px))",
                marginTop: "1rem",
                height: "calc((100vh - 250px))",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                  gap: "0.5rem",
                }}
              >
                {!isLoading &&
                  topics.length > 0 &&
                  topics.map((topic: any, index) => (
                    <Box
                      sx={{ display: "flex", minHeight: "100px" }}
                      key={index}
                    >
                      <Box
                        sx={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          borderRadius: "calc(0.5rem - 2px)",
                          padding: "0.5rem",
                          width: "100%",
                          height: "100%",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="h5"
                            fontSize={`small`}
                            fontWeight={`bold`}
                          >
                            <i className="bi bi-person"></i> {topic.name}
                          </Typography>
                        </Box>
                        <Typography variant="caption">
                          {topic.description}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "auto",
                          }}
                        >
                          <Box
                            sx={{
                              marginTop: "auto",
                              display: "flex",
                              gap: "0.5rem",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="caption">
                              <i className="bi bi-journal-bookmark"></i>
                              12324
                            </Typography>
                            <Typography variant="caption">
                              <i className="bi bi-chat-left-text"></i>
                              12324
                            </Typography>
                          </Box>
                          <Box>
                            <Link to={`/exercise/${topic.uuid}`}>
                              <Typography variant="caption">Take test</Typography>
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>

          <Box></Box>
        </Box>
        <Box
          sx={{
            background: "#eee",
            width: "100%",
            textAlign: "center",
            height: "calc(100vh - calc(100vh - 40px))",
            padding: "0.5rem",
          }}
        >
          <Typography variant="caption" textAlign={`center`}>
            &copy; Copyrights Tagne Inc 2023.
          </Typography>
        </Box>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
