import React, { useEffect, useState } from 'react';
import { ProjectConfiguration, useCreateProjectContext } from '../../contexts/CreateProjectContext';
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
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
  const [projConfig, setProjConfig] = useState<ProjectConfiguration | null>(null); // To get available tags
  const { setProject } = useProject();
  const { projectId } = useParams<{ projectId: string }>();

  const [newProjTags, setNewTags] = useState<string[]>(project?.tags || []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleToggleTag = (tag: string) => {
    const isSelected = newProjTags?.includes(tag);
    setNewTags(
      isSelected ? newProjTags.filter((t) => t !== tag) : [...newProjTags, tag]
    );
  };

  useEffect(() => {
    console.log(project);
    console.log(newProjTags);
  }, [project]);

  useEffect(() => {
    const fetchTagsAndPaymentMethods = async () => {
      try {
        const data = await getProjectConfiguration();
        setProjConfig(data);
      } catch (err: any) {
        console.log('err', err);
      }
    };

    setProject(project);
    fetchTagsAndPaymentMethods();
    if (firstTimeProjectTags) {
      project?.tags ? setNewTags(project?.tags) : setNewTags([]);
      firstTimeProjectTags = false;
    }
  }, [project]);

  const handleAddTagClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectTag = (tag: string) => {
    setNewTags([...newProjTags, tag]);
    handleClose();
  };

  useEffect(() => {
    if (projectId) {
      fetchProject(Number(projectId), 'edit');
    }
  }, [projectId, fetchProject]);

  const open = Boolean(anchorEl);
  const id = open ? 'add-tag-popover' : undefined;

  // Filter out the tags that are already in newProjTags
  const usedTags = configurations?.tags.filter((tag) => newProjTags.includes(tag)) || [];

  const unusedTags = configurations?.tags.filter((tag) => !newProjTags.includes(tag)) || [];

  return (
    <Box sx={{ height: 'auto', marginTop: 5 }}>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2.5 }}>
              Select tags for your project
            </Typography>
      <Grid container spacing={2} alignItems="center">
        {usedTags.length === 0 ? (
          <Typography variant="body2">No more tags available</Typography>
        ) : (
          usedTags.map((tag) => (
            <Grid item key={tag}>
              <Chip
                label={tag}
                clickable
                onClick={() => handleToggleTag(tag)}
                color="primary"
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

        <Grid item>
          <IconButton
            onClick={handleAddTagClick}
            size="large"
            sx={{ color: 'grey.500' }}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <List>
              {unusedTags.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No tags available" />
                </ListItem>
              ) : (
                unusedTags.map((tag) => (
                  <ListItemButton button key={tag} onClick={() => handleSelectTag(tag)}>
                    <ListItemText primary={tag} />
                  </ListItemButton>
                ))
              )}
            </List>
          </Popover>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryAndTagsForm;
