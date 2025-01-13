import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid, Typography, Button, Card, CardMedia } from '@mui/material';
import { ProjectConfiguration, useCreateProjectContext } from '../../contexts/CreateProjectContext';
import StoryEditor from '../StoryEditor/StoryEditor';
import CropModal from '../../CropModal/CropModal';
import { uploadImageToDrive } from '../../utils/imagesApi';
import { useProjectData } from '../../hooks/useProjectData';
import { useProject } from '../../contexts/ProjectContext';
import { getProjectConfiguration } from '../../utils/projectsApi';
import { useParams } from 'react-router-dom';







const ProjectDetailsForm: React.FC = () => {
  const { state, setState, configurations } = useCreateProjectContext();
  const { project, fetchProject, isLoading, error } = useProjectData();
  const [projConfig, setProjConfig] = useState<ProjectConfiguration | null>(null); // To get available tags
  const { setProject } = useProject();
  const { projectId } = useParams<{ projectId: string }>();
  
  const [newProjTags, setNewTags] = useState<string[]>(project?.tags || []);
  
  
  
  
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
   
  }, [project]);
  
  useEffect(() => {
    if (projectId) {
      fetchProject(Number(projectId), 'edit');
    }
  }, [projectId, fetchProject]);
  
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

  return project ?(
    <Box sx={{ height: 'auto', marginTop: 5 }}>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2.5 }}>
        Edit Project Details
      </Typography>
      <Grid container spacing={6}>        
        
        <Grid item xs={12}>
          <StoryEditor content={project?.story || ''} onUpdate={(markdown: any) => handleStoryUpdate(markdown)} />

        </Grid>      

      </Grid>

      <CropModal
        open={isCropModalOpen}
        onClose={handleImageDelete}
        onCrop={handleCrop}
        imageUrl={tempimageUrl || ''}
      />
    </Box>
  ): (
    <p>No project to edit.</p>
  );
};

export default ProjectDetailsForm;
