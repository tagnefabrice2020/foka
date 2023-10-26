import React from "react";
import DashboardLayout from "../../dashboadLayout";
import { Box, Typography } from "@mui/material";
import { Button } from "../../button";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box
        sx={{
          padding: "1rem",
          maxWidth: "calc((900px / 16) * 1rem)",
          margin: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }} p={1}>
          <Typography>Dashboard</Typography>
          <Box>
            <Button></Button>
          </Box>
        </Box>

        <Box mt={1}>
          <Box
            p={1}
            sx={{
              display: "grid",
              gap: "1rem 2rem",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(calc((250 / 16) * 1rem), 1fr))",
              "& > div": {
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              },
            }}
          >
            {Array(4)
              .fill(0)
              .map(() => (
                <Box
                  sx={{
                    padding: "1rem",
                    borderRadius: "0.4rem",
                    position: "relative",
                    "&::after": {
                      position: "absolute",
                      content: "''",
                      width: "100%",
                      height: "1rem",
                      bottom: "0",
                      left: "0",
                    },
                  }}
                >
                  <Typography>09</Typography>
                  <Typography>Number of Topics</Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
