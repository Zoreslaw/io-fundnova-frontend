import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  createTheme,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Reward } from "../types/Reward";
import RewardCard from "../components/RewardCards/RewardCard";
import NoRewardCard from "../components/RewardCards/NoRewardCard";
import { usePayment } from "../contexts/PaymentContext";
import { useProjectData } from "../hooks/useProjectData"; 

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0056b3", dark: "#0056b34a" },
    secondary: { main: "#3d3d3d" },
    background: { default: "#2a2a2a", paper: "#333333" },
    text: { primary: "#d8d8d8", secondary: "#b0b0b0" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { color: "#d8d8d8" },
    body1: { color: "#b0b0b0" },
  },
});

const BackProjectPage: React.FC = () => {
  const { setProject, setReward, setPledgeAmount } = usePayment();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [customPledge, setCustomPledge] = useState<number>(0);

  const { project, fetchProject, isLoading, error } = useProjectData();

  useEffect(() => {
    if (projectId) {
      fetchProject(Number(projectId), "view");
    }
  }, [projectId, fetchProject]);

  useEffect(() => {
    if(project){
        setProject(project);
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

  const handleCustomPledgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(event.target.value);
    setCustomPledge(amount);
    setPledgeAmount(amount);
  };

  const handleContinue = () => {
    if (selectedReward) {
      console.log("Selected reward:", selectedReward); // Debugging
      console.log("Pledge Amount:", customPledge); // Debugging

      setTimeout(() => {
        navigate(`/projects/${projectId}/back-project/payment`);
      }, 200); // Added delay to ensure context updates
    }
  };

  if (isLoading) return <Typography>Loading project details...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Back Project
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          Select your reward
        </Typography>

        <Box
          sx={{
            border: 2,
            borderColor: "secondary.main",
            borderRadius: 2,
            p: 2,
            mt: 2,
          }}
        >
          <Stack direction="column" spacing={2} alignItems="center">
            {availableRewards.map((reward, index) =>
              reward.price === 0 ? (
                <NoRewardCard
                  key={index}
                  onSetPledgeAmount={(amount) => {
                    setSelectedReward({
                      title: "No Reward",
                      price: amount,
                      contents: false,
                      description: "Support the project without a reward.",
                    });
                    setReward({
                      title: "No Reward",
                      price: amount,
                      contents: false,
                      description: "Support the project without a reward.",
                    });
                    setPledgeAmount(amount);
                  }}
                  sx={{ maxWidth: "50%" }}
                />
              ) : (
                <RewardCard
                  key={index}
                  reward={reward}
                  onClick={() => handleSelectReward(reward)}
                  sx={{ maxWidth: "50%" }}
                  isSelected={selectedReward?.title === reward.title}
                />
              )
            )}
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BackProjectPage;
