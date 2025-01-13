import React, { useEffect, useState } from "react";
import { Reward } from "../../types/Reward";
import { Grid, Stack } from "@mui/material";
import RewardCard from "../RewardCards/RewardCard";
import { usePayment } from "../../contexts/PaymentContext";
import { useProjectData } from "../../hooks/useProjectData";
import { useParams } from "react-router-dom";

interface RewardDisplayProps {
  rewards: Reward[];
}

const RewardDisplay: React.FC<RewardDisplayProps> = ({ rewards }) => {
  const { setProject, setReward, setPledgeAmount, setProjectId } = usePayment();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
  const [customPledge, setCustomPledge] = useState<number>(0);
  const { projectId } = useParams<{ projectId: string }>();

  const { project, fetchProject, isLoading, error } = useProjectData();

    useEffect(() => {
      if (projectId) {
        fetchProject(Number(projectId), "view");
      }
    }, [projectId, fetchProject]);

      useEffect(() => {
        if(project){
            setProject(project);
            setProjectId(projectId ? projectId : null)
        }
      }, [project]);

        useEffect(() => {
          if (project?.rewards && Array.isArray(project.rewards)) {
            setAvailableRewards([
              {
                title: "No Reward",
                price: 0,
                contents: false,
                description: "Support the project without a reward.",
              },
              ...project.rewards,
            ]);
          }
        }, [project]);
      
        const handleSelectReward = (reward: Reward) => {
          setSelectedReward(reward);
          setReward(reward);
          setPledgeAmount(reward.price);
          setCustomPledge(reward.price);
        };
  
  return (
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
          onClick={() => handleSelectReward(reward)}
          isSelected={selectedReward?.title === reward.title}
        />

    ))}
  </Stack>
  );
};

export default RewardDisplay;
