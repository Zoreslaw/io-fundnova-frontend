import React from 'react';
import { useCreateProjectContext } from '../../contexts/CreateProjectContext';
import { Box, Chip, Grid, Typography } from '@mui/material';

const predefinedTags = [
  'Technology',
  'Health',
  'Education',
  'Art',
  'Gaming',
  'Environment',
  'Science',
]; // Replace with your actual predefined tags.

const TagsSelector: React.FC = () => {
  const { state, setState } = useCreateProjectContext();

  const handleToggleTag = (tag: string) => {
    const isSelected = state.tags.includes(tag);
    setState((prev) => ({
      ...prev,
      tags: isSelected
        ? prev.tags.filter((t) => t !== tag) // Remove tag if already selected.
        : [...prev.tags, tag], // Add tag if not selected.
    }));
  };

  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        Select Tags for Your Project:
      </Typography>
      <Grid container spacing={1}>
        {predefinedTags.map((tag) => (
          <Grid item key={tag}>
            <Chip
              label={tag}
              clickable
              onClick={() => handleToggleTag(tag)}
              color={state.tags.includes(tag) ? 'primary' : 'default'}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TagsSelector;
