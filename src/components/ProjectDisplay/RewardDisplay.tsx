import React from "react";
import { Reward } from "../../types/Reward";
import { Grid } from "@mui/material";
import RewardCard from "../RewardCards/RewardCard";

interface RewardDisplayProps {
  rewards: Reward[];
}

const RewardDisplay: React.FC<RewardDisplayProps> = ({ rewards }) => (
  <Grid container spacing={2}>
    {rewards.map((reward) => (
      <Grid item xs={12} sm={6} md={4} key={reward.rewardId}>
        <RewardCard
          reward={{ ...reward }}
        />
      </Grid>
    ))}
  </Grid>
);

export default RewardDisplay;
