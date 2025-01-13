import React from "react";
import { Reward } from "../../types/Reward";
import { Grid, Stack } from "@mui/material";
import RewardCard from "../RewardCards/RewardCard";

interface RewardDisplayProps {
  rewards: Reward[];
}

const RewardDisplay: React.FC<RewardDisplayProps> = ({ rewards }) => (
  <Stack
    direction="column"
    spacing={2}
    sx={{
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {rewards.map((reward) => (
      // <Grid item xs={12} sm={6} md={4} key={reward.rewardId}>

        <RewardCard
          sx={{ maxWidth: "50%" }}
          reward={{ ...reward }}
        />

    ))}
  </Stack>
);

export default RewardDisplay;
