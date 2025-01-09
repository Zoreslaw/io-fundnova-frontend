import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProjectData } from "../hooks/useProjectData";
import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { Reward } from "../types/Reward";
import RewardCard from "../components/RewardCards/RewardCard";

const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#0056b3', dark: '#0056b34a' },
      secondary: { main: '#3d3d3d' },
      background: { default: '#2a2a2a', paper: '#333333' },
      text: { primary: '#d8d8d8', secondary: '#b0b0b0' },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h4: { color: '#d8d8d8' },
      body1: { color: '#b0b0b0' },
    },
});

const BackProjectPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { project, fetchProject, isLoading, error } = useProjectData();

    const [ nameYourPrice, setYourPrice ] = useState<number>(0);

    const dummyReward: Reward = {
        title: "No Reward",
        price: 0,
        contents: false as string | boolean,
        description: "Support the project, but do not send any rewards.",
    };
    const [ availableRewards, setAvailableRewards ] = useState<Reward[]>([dummyReward]);

    const [ selectedReward, setSelectedReward ] = useState<number>(0);

    useEffect(() => {
        if (projectId) {
            fetchProject(Number(projectId), "view");
        }
    }, [projectId, fetchProject]);

    useEffect(() => {
        //setAvailableRewards(availableRewards?.concat(project?.rewards)); //sometimes breaks, TODO: Fix this.
    }, [project]);

    const handleSelectReward = (index: number) => {
        setSelectedReward(index);
    };

    const handleChangedAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
    
        if (name === "CustomAmount") {
          setYourPrice(Number(value));
        };
      };

    if (isLoading) return <p>Loading project details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <ThemeProvider theme={theme}>
                <h1 style={{textAlign: "center"}}>Back Project</h1>
                {(!isLoading && !error) ? (
                <Box>
                    <Box>
                        <Typography sx={{mt: 2, textAlign: "center"}} variant="h6">Select your reward</Typography>
                        <Box sx={{
                            border: 2, 
                            borderColor: 'secondary.main', 
                            borderRadius: 2, 
                            p: 2, 
                            mt: 2,
                        }}>
                            { availableRewards.map((rew, index) => (
                                <Button onClick={() => (handleSelectReward(index))}
                                sx={(index == selectedReward) ? {bgcolor: 'primary.dark'} : {bgcolor: 'default.main'}}
                                >
                                    <RewardCard reward={rew} key={index}/>
                                </Button>
                            ))}
                        </Box>
                    </Box>
                    
                        <TextField 
                            label="Name your price ($)"
                            name="CustomAmount"
                            type="number"
                            fullWidth
                            defaultValue={nameYourPrice}
                            onChange={handleChangedAmount}
                            disabled={(selectedReward == 0) ? (false) : (true)}
                            sx={{mt: 2}}
                        />
                    <Button 
                        variant="contained" 
                        fullWidth
                        sx={{mt: 2}}>
                        Support
                    </Button>
                </Box>
                ) : (<p>Error has occured.</p>)
                }
            </ThemeProvider>
        </div>
    )
};

export default BackProjectPage;