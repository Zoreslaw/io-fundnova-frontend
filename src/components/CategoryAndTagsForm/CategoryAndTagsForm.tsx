import React from 'react';
import { useCreateProjectContext } from '../../contexts/CreateProjectContext';
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Chip,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

const predefinedCategories = ['Art', 'Technology', 'Health', 'Education', 'Gaming', 'Science', 'Environment'];
const predefinedTags = ['Technology', 'Health', 'Education', 'Art', 'Gaming', 'Environment', 'Science'];

const CategoryAndTagsForm: React.FC = () => {
  const { state, setState } = useCreateProjectContext();

  // Устанавливаем дефолтное значение категории, если оно ещё не задано
  React.useEffect(() => {
    if (!state.category) {
      setState((prev) => ({
        ...prev,
        category: predefinedCategories[0], // Первое значение из массива
      }));
    }
  }, [state.category, setState]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setState((prev) => ({
      ...prev,
      category: event.target.value,
    }));
  };

  const handleToggleTag = (tag: string) => {
    const isSelected = state.tags.includes(tag);
    setState((prev) => ({
      ...prev,
      tags: isSelected
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <Box
    sx={{ paddingTop: 5 }}
    //  sx={{ padding: 3, borderRadius: 2, backgroundColor: 'background.paper', boxShadow: 3 }}
    >
      {/* <Typography variant="h5" sx={{ mb: 4, color: 'text.primary', textAlign: 'center' }}>
        Select a Category and Tags for Your Project
      </Typography> */}

      {/* Category Selection */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={state.category || predefinedCategories[0]}
          label="Category"
          onChange={handleCategoryChange}
          sx={{
            borderRadius: 2,
            backgroundColor: 'background.default',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'text.secondary',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        >
          {predefinedCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Tags Selection */}
      <Typography variant="body1" sx={{ mb: 2, color: 'text.primary', fontWeight: 'bold' }}>
        Select Tags for Your Project:
      </Typography>
      <Grid container spacing={2}>
        {predefinedTags.map((tag) => (
          <Grid item key={tag}>
            <Chip
              label={tag}
              clickable
              onClick={() => handleToggleTag(tag)}
              color={state.tags.includes(tag) ? 'primary' : 'default'}
              sx={{
                padding: 1,
                fontSize: '1rem',
                '&.MuiChip-clickable:hover': {
                  backgroundColor: 'primary.light',
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryAndTagsForm;
