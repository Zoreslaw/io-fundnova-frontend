import React, { useEffect, useState } from 'react';
import { ProjectConfiguration, useCreateProjectContext } from '../../contexts/CreateProjectContext';
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useProjectData } from "../../hooks/useProjectData";
import { getProjectConfiguration } from '../../utils/projectsApi';
import { useProject } from '../../contexts/ProjectContext';
import { useParams } from 'react-router-dom';

const CategoryAndTagsForm: React.FC = () => {

  let firstTimeProjectTags: boolean = true;

  const { state, setState, configurations } = useCreateProjectContext();
  const { project, fetchProject, isLoading, error } = useProjectData();
  const [ projConfig, setProjConfig ] = useState<ProjectConfiguration | null>(null); //To get available tags
  const { setProject } = useProject();
  const { projectId } = useParams<{ projectId: string }>();

  // Initialize newProjTags with the project's existing tags
  const [newProjTags, setNewTags] = useState<string[]>(project?.tags || []);

  const handleToggleTag = (tag: string) => {
    const isSelected = newProjTags?.includes(tag);
    setNewTags(isSelected
      ? newProjTags.filter((t) => t !== tag)
      : [...newProjTags, tag]
    );
    
  };

  useEffect(()=>{
    console.log(project);
    console.log(newProjTags);
  },[project])

  useEffect(()=>{
    const fetchTagsAndPaymentMethods = async () => {
      try {
        const data = await getProjectConfiguration();
        setProjConfig(data);
      } catch (err: any) {
        console.log('err', err);
      }
    }
    
    setProject(project);
    fetchTagsAndPaymentMethods();
    if (firstTimeProjectTags) {
      project?.tags ? setNewTags(project?.tags) : setNewTags([]);
      firstTimeProjectTags = false;
    }
  }, [project])

  const handleAddTag = () => {
    console.log('Add new tag button clicked');
    // Logic for adding a new tag can go here
  };

  useEffect(() => {
    if (projectId) {
      fetchProject(Number(projectId), "edit");
    }
  }, [projectId, fetchProject]);

  // Filter out the tags that are already in newProjTags
  const availableTags = configurations?.tags.filter(
    (tag) => !newProjTags.includes(tag)
  ) || [];

  return (
    <Box sx={{ paddingTop: 5 }}>
      <Typography variant="body1" sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
        Select Tags for Your Project:
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {/* Display the available tags (filtered from predefinedTags) */}
        {availableTags.length === 0 ? (
          <Typography variant="body2">No more tags available</Typography>
        ) : (
          availableTags.map((tag) => (
            <Grid item key={tag}>
              <Chip
                label={tag}
                clickable
                onClick={() => handleToggleTag(tag)}
                color='default' 
                sx={{
                  padding: 1,
                  fontSize: '1rem',
                  '&.MuiChip-clickable:hover': {
                    backgroundColor: 'primary.light',
                  },
                }}
              />
            </Grid>
          ))
        )}

        {/* Add Circle Button */}
        <Grid item>
          <IconButton 
            onClick={handleAddTag} 
            size="large" 
            sx={{ color: 'grey.500' }}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryAndTagsForm;
