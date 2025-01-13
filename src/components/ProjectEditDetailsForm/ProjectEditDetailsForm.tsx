import React, { useState } from 'react';
import { Box, TextField, Grid, Typography, Button, Card, CardMedia } from '@mui/material';
import { useCreateProjectContext } from '../../contexts/CreateProjectContext';
import StoryEditor from '../StoryEditor/StoryEditor';
import CropModal from '../../CropModal/CropModal';
import { uploadImageToDrive } from '../../utils/imagesApi';

const ProjectDetailsForm: React.FC = () => {
  const { state, setState } = useCreateProjectContext();

  const [errors, setErrors] = useState({
    fundingGoal: false,
    deadline: false,
  });
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [tempimageUrl, setTempimageUrl] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const MIN_FUNDING_GOAL = 100;
  const MIN_DEADLINE_DAYS = 60;

  const handleStoryUpdate = (markdown: string) => {
    setState((prevState) => ({
      ...prevState,
      story: markdown,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'fundingGoal') {
      const fundingGoal = Number(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        fundingGoal: fundingGoal < MIN_FUNDING_GOAL,
      }));
    }

    if (name === 'deadline') {
      const selectedDate = new Date(value);
      const minDeadlineDate = new Date();
      minDeadlineDate.setDate(minDeadlineDate.getDate() + MIN_DEADLINE_DAYS);

      setErrors((prevErrors) => ({
        ...prevErrors,
        deadline: selectedDate < minDeadlineDate,
      }));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTempimageUrl(URL.createObjectURL(file));
      setIsCropModalOpen(true);
      event.target.value = '';
    }
  };

  const handleCrop = async (croppedImage: Blob) => {
    setIsUploading(true);
    try {
      const uploadedURL = await uploadImageToDrive(new File([croppedImage], 'project-image.png'));
      setState((prevState) => ({
        ...prevState,
        imageUrl: uploadedURL,
      }));
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setIsCropModalOpen(false);
      setTempimageUrl(undefined);
    }
  };
  const handleImageDelete = () => {
    setState((prevState) => ({
      ...prevState,
      imageUrl: '',
    }));
  };

  return (
    <Box sx={{ height: 'auto', marginTop: 5 }}>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2.5 }}>
        Enter Project Details
      </Typography>
      <Grid container spacing={6}>        
        <Grid item xs={12}>
          <TextField
            label="Project Description"
            name="description"
            multiline
            rows={4}
            fullWidth
            required
            value={state.description}
            onChange={handleChange}
            helperText="Describe your project in detail."
          />
        </Grid>
        <Grid item xs={12}>
          <StoryEditor content={state.story} onUpdate={(markdown: any) => handleStoryUpdate(markdown)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Funding Goal ($)"
            name="fundingGoal"
            type="number"
            fullWidth
            required
            value={state.fundingGoal}
            onChange={handleChange}
            error={errors.fundingGoal}
            helperText={
              errors.fundingGoal
                ? `Funding goal must be at least $${MIN_FUNDING_GOAL}.`
                : `Set a goal of at least $${MIN_FUNDING_GOAL}.`
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Deadline"
            name="deadline"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={state.deadline}
            onChange={handleChange}
            error={errors.deadline}
            helperText={
              errors.deadline
                ? `Deadline must be at least ${MIN_DEADLINE_DAYS} days from today.`
                : `Select a deadline at least ${MIN_DEADLINE_DAYS} days in the future.`
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Upload Project Main Image
          </Typography>
          <Button
            variant="contained"
            component="label"
            color="primary"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          {state.imageUrl && (
            <Box mt={2}>
              <Card sx={{ display: 'block', width: '100%', maxWidth: 300, aspectRatio: '16/9', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  image={state.imageUrl}
                  alt="Main Project Image"
                />
              </Card>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleImageDelete}
                sx={{ mt: 1 }}
              >
                Delete Image
              </Button>
            </Box>
          )}
        </Grid>

      </Grid>

      <CropModal
        open={isCropModalOpen}
        onClose={handleImageDelete}
        onCrop={handleCrop}
        imageUrl={tempimageUrl || ''}
      />
    </Box>
  );
};

export default ProjectDetailsForm;
