import React from "react";
import { LinearProgress, Typography, Box, Card } from "@mui/material";

interface FundingStatsProps {
  fundsRaised: number;
  fundingGoal: number;
  backers: number;
  deadline: string;
}

const FundingStats: React.FC<FundingStatsProps> = ({
  fundsRaised,
  fundingGoal,
  backers,
  deadline,
}) => {
  const progress = Math.min((fundsRaised / fundingGoal) * 100, 100);

  return (
    <Card
      sx={{
        width: "100%",
        padding: 2,
        backgroundColor: "#2a2a2a",
        color: "#d8d8d8",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
          fontSize: "1.2rem",
          textAlign: "left",
        }}
      >
        Funding Progress
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 5,
          marginBottom: 2,
          backgroundColor: "#555555",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#1976d2",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0.5,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "1rem", fontWeight: "500" }}>
          {fundsRaised} / {fundingGoal} raised
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "1rem", fontWeight: "500" }}>
          {backers} Backers
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "1rem", fontWeight: "500", color: "#b0b0b0" }}
        >
          Deadline: {deadline}
        </Typography>
      </Box>
    </Card>
  );
};

export default FundingStats;
