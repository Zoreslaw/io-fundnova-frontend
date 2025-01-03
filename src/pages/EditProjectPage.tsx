import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectData } from "../hooks/useProjectData";
import { getProjectConfiguration, updateProjectApi } from "../utils/projectsApi";
import { useProject } from "../contexts/ProjectContext";
import { Box, Button, Chip, createTheme, Grid2, TextField, ThemeProvider } from "@mui/material";
import StoryEditor from "../components/StoryEditor/StoryEditor";
import { ProjectConfiguration } from "../contexts/CreateProjectContext";
import RewardDisplay from "../components/ProjectDisplay/RewardDisplay";

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

  const [ projConfig, setProjConfig ] = useState<ProjectConfiguration | null>(null); //To get available tags and payment info
  let firstTimeProjectTags: boolean = true;

  const [ newProjDescr, setNewDescr ] = useState<string | undefined>(project?.description);
  const [ newProjStory, setNewStory ] = useState<string | undefined>(project?.story);
  const [ newProjTags, setNewTags ] = useState<string[] | undefined>(project?.tags);
  

  useEffect(()=>{
    const fetchTagsAndPaymentMethods = async () => {
      try {
        const data = await getProjectConfiguration();
        setProjConfig(data)
      } catch (err: any) {
        console.log('err',err)
      }
    }

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
  };

  const handleToggleTag = (handledTag: string) => {
    const isSelected = newProjTags?.includes(handledTag);
    setNewTags(isSelected ? newProjTags?.filter((t) => t !== handledTag) : newProjTags?.concat([handledTag]))
  }

  if (isLoading) return <p>Loading project for editing...</p>;
  if (error) return <p>Error: {error}</p>;

  return project ? (
    <div>
      <h1 style={{textAlign: "center"}}>Edit Project: {project.title}</h1>
      <ThemeProvider theme={theme}>
        <Box component="form">
          {/* WORKS: Updating description, Updating story, Selecting Tags*/}
          {/* TODO: Updating Tags, Payment and Rewards Editing*/}
          <TextField
                sx={{
                  mt: 4,
                }}
                label="Change Project Description"
                name="Description"
                fullWidth
                multiline
                defaultValue={project.description}
                onChange={handleChangedInfo}
                helperText="Describe your project in a few sentences."
              />
          <Grid2 container spacing={2} sx={{ mt: 2}}>
              { projConfig?.tags.map((tag) => (
                <Chip 
                  label={tag}
                  clickable
                  color={newProjTags?.includes(tag) ? 'primary' : 'default'}
                  onClick={() => handleToggleTag(tag)}
                />
              ))
              }
          </Grid2>
          <Box sx={{ bgcolor: 'secondary.main', p: 2, mt: 2, borderRadius: 2}}>
            <StoryEditor content={project.story} onUpdate={(markdown: string) => handleStoryUpdate(markdown)} />
          </Box>
          {/* Payment,
              Rewards */}
          <Box sx = {{mt: 2}}>
            
          </Box>
          <Box sx={{mt: 2}}>
            <RewardDisplay rewards={project.rewards} />
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
  ) : (
    <p>No project to edit.</p>
  );
};

export default EditProjectPage;
