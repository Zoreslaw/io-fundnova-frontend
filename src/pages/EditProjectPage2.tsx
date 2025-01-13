import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectData } from "../hooks/useProjectData";
import { fetchUserAccessForEdit, getProjectConfiguration, updateProjectApi } from "../utils/projectsApi";
import { useProject } from "../contexts/ProjectContext";
import { Box, Button, Chip, createTheme, Grid2, TextField, ThemeProvider, Typography } from "@mui/material";
import StoryEditor from "../components/StoryEditor/StoryEditor";
import { ProjectConfiguration } from "../contexts/CreateProjectContext";
import RewardDisplay from "../components/ProjectDisplay/RewardDisplay";
import PaymentMethodsForm from "../components/PaymentMethodsForm/PaymentMethodsForm";
import RewardForm from "../components/RewardForm/RewardForm";
import { Reward } from "../types/Reward";
import { useAuth } from "../contexts/AuthContext";
//import ProjectDisplay from "../components/ProjectDisplay/ProjectDisplay";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0056b3' },
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

const EditProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, fetchProject, isLoading, error } = useProjectData();
  const navigate = useNavigate();
  const { setProject } = useProject();
  const { user } = useAuth();

  const [ projConfig, setProjConfig ] = useState<ProjectConfiguration | null>(null); //To get available tags
  let firstTimeProjectTags: boolean = true;

  const [ newProjDescr, setNewDescr ] = useState<string | undefined>(project?.description);
  const [ newProjStory, setNewStory ] = useState<string | undefined>(project?.story);
  const [ newProjTags, setNewTags ] = useState<string[] | undefined>(project?.tags);
  const [ newProjPayment, setNewPayment ] = useState<{cardNumber: string, paymentMethod: string} | undefined>(project?.paymentInfo);
  const [ newProjRewards, setNewRewards ] = useState<Reward[] | undefined>(project?.rewards)

  const [ isEditing, setIsEditing ] = useState<boolean>(true);
  const [ canEdit, setCanEdit ] = useState<boolean>(false);

  const canUserEditProject = async () => {
    try {
      const response = await fetchUserAccessForEdit({projectId: projectId, userId: user.userId});
      setCanEdit(response);
    } catch (err: any) {
      console.log('err', err);
      setCanEdit(false);
    }
  }

  useEffect(()=>{
    const fetchTagsAndPaymentMethods = async () => {
      try {
        const data = await getProjectConfiguration();
        setProjConfig(data);
      } catch (err: any) {
        console.log('err', err);
      }
    }

    canUserEditProject();
    setProject(project);
    fetchTagsAndPaymentMethods();
    if (firstTimeProjectTags) {
      setNewTags(project?.tags);
      firstTimeProjectTags = false;
    }
  }, [project])

  useEffect(() => {
    if (projectId) {
      fetchProject(Number(projectId), "edit");
    }
  }, [projectId, fetchProject]);

  const handleChangedInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "Description") {
      setNewDescr(value);
    };
  };

  const handleStoryUpdate = (markdown: string) => {
    setNewStory(markdown);
  };

  const handleEditProject = async (updatedData: any) => {
    try {
      await updateProjectApi(updatedData);
      navigate("/preview-project");
    } catch (error) {
      console.error("Error updating project:", error);
    }
    setIsEditing(false);
  };

  const handleToggleTag = (handledTag: string) => {
    const isSelected = newProjTags?.includes(handledTag);
    setNewTags(isSelected ? newProjTags?.filter((t) => t !== handledTag) : newProjTags?.concat([handledTag]))
  };

  const handlePaymentChange = (handledCardNumber:string, handledPaymentMethod: string) => {
    const newInfo = {cardNumber: handledCardNumber, paymentMethod: handledPaymentMethod};
    setNewPayment(newInfo);
  };

  const handleNewRewards = (rewards: Reward[]) => {
    setNewRewards(rewards);
  };

  if (isLoading) return <p>Loading project for editing...</p>;
  if (error) return <p>Error: {error}</p>;
  //if (!canEdit) return <p>Error: No permissions for editing</p>;

  return project ? (
    //isEditing ? (
    <div>
      <h1 style={{textAlign: "center"}}>Edit Project: {project.title}</h1>
      <ThemeProvider theme={theme}>
        <Box component="form">
          {/* WORKS: Updating description, Updating story, Updating Tags, Updating rewards*/}
          {/* TODO: 
          - Payment Update: Backend doesn't update payment method for some reason. Maybe a spelling error somewhere? 
          */}
          <TextField
                sx={{
                  mt: 2,
                }}
                label="Change Project Description"
                name="Description"
                fullWidth
                multiline
                defaultValue={project.description}
                onChange={handleChangedInfo}
                helperText="Describe your project in a few sentences."
              />
          <Box>
            <Typography sx={{textAlign: "center"}} variant="h6">Select tags:</Typography>
            <Grid2 container spacing={2} sx={{border: 2, borderColor: 'secondary.main', borderRadius: 2, p: 2, mt: 2, mb: 2, justifyContent: "center", alignItems: "center"}}>
                { projConfig?.tags.map((tag) => (
                  <Chip 
                    label={tag}
                    clickable
                    color={newProjTags?.includes(tag) ? 'primary' : 'default'}
                    onClick={() => handleToggleTag(tag)}
                  />
                ))}
            </Grid2>
          </Box>
          <Box>
            <Typography sx={{textAlign: "center"}} variant="h6">Change campaign:</Typography>
            <Box sx={{ bgcolor: 'secondary.main', p: 3, mt: 2, borderRadius: 2}}>
              <StoryEditor content={project.story} onUpdate={(markdown: string) => handleStoryUpdate(markdown)} />
            </Box>
          </Box>
          <Box sx={{mt: 2}}>
            <PaymentMethodsForm onUpdate={(cardNumb: string, paymentInfo: string) => handlePaymentChange(cardNumb, paymentInfo)}/>
          </Box>
          <Box sx={{mt: 2}}>
            <h4>Previous rewards:</h4>
            <RewardDisplay rewards={project.rewards} />
          </Box>
          <Box sx={{mt: 2}}>
            <RewardForm onUpdate={(rewards: Reward[]) => handleNewRewards(rewards)}/>
          </Box>
        </Box>
        <Button onClick={(e) => {
            e.preventDefault();
            const updatedData = {
              //...project,
              projectId: projectId,
              description: newProjDescr,
              story: newProjStory,
              tags: newProjTags,
              paymentInfo: newProjPayment,
              rewards: newProjRewards,
            };
            handleEditProject(updatedData);
          }}
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
          }}
        >Save and Preview</Button>
      </ThemeProvider>
    </div>
    /*) : (<div>
          <ProjectDisplay {...project} mode="preview"/>
          <Button 
          variant="contained"
          fullWidth
          sx={{mb: 2, mt: 2}}
          onClick={() => {setIsEditing(true)}}>Back to Editing</Button>
        </div>
    )
        */
  ) : (
    <p>No project to edit.</p>
  );
};

export default EditProjectPage;