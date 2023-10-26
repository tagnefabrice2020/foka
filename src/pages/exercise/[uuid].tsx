import React from "react";
import Layout from "../../components/layout";
import { Box, Typography } from "@mui/material";
import Timer from "../../components/timer";

const Exercise = () => {
  return (
    <Layout>
      <main
        style={{
          marginTop: "calc(0vh + 51px)",
          // minHeight: "calc(100vh - 51px)",
        }}
      >
        <Box sx={{}}>
          <Box>
            <Typography variant="h4"></Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                    {1}/{20}
                  </Typography>

                  <Box sx={{}}>
                    <Timer questionLength={20} />
                  </Box>
                </Box>
                          </Box>
                          <Box>
                              
                          </Box>
            </Box>
                      <Box>
                          indicators
            </Box>
          </Box>
        </Box>
      </main>
    </Layout>
  );
};

export default Exercise;
