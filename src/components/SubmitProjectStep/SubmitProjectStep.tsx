import React, { useState } from 'react';
import { useCreateProjectContext } from '../../contexts/CreateProjectContext';
import { createProjectApi } from '../../utils/projectsApi';
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { ProjectCreatePayload } from '../../types/ProjectsPayload';
import { useAuth } from '../../contexts/AuthContext';

const SubmitProjectStep: React.FC = () => {
  const { state } = useCreateProjectContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  if(!user){
    alert("WTF");
    return null;
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
  
    try {
    const payload: ProjectCreatePayload = {
        userId: user.userId,
        title: state.title,
        description: state.description,
        imageURL: state.imageURL,
        tags: state.tags,
        category: state.category,
        story: state.story,
        fundingGoal: state.fundingGoal,
        deadline: state.deadline,
        paymentInfo: {
            cardNumber: state.paymentInfo.cardNumber,
            paymentMethod: state.paymentInfo.paymentMethod,
        },
        rewards: state.rewards.map((reward) => ({
            title: reward.title || '',
            price: reward.price || 0,
            contents: reward.contents || false,
            description: reward.description || undefined,
            deadline: reward.deadline || undefined,
            count: reward.count || undefined,
            imageURL: reward.imageURL || undefined,
        })),
        };
          
  
      await createProjectApi(payload);
      window.location.href = '/'; // Redirect to homepage after success
    } catch (err) {
      setError('Failed to submit the project. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Review and Submit
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please review the details of your project before submission.
      </Typography>

      {/* Display project details */}
      <Box mt={2}>
        <Typography variant="h6">Project Title:</Typography>
        <Typography>{state.title}</Typography>

        <Typography variant="h6">Description:</Typography>
        <Typography>{state.description}</Typography>

        <Typography variant="h6">Funding Goal:</Typography>
        <Typography>${state.fundingGoal}</Typography>

        <Typography variant="h6">Deadline:</Typography>
        <Typography>{state.deadline}</Typography>

        <Typography variant="h6">Selected Payment Method:</Typography>
        <Typography>{state.paymentInfo.paymentMethod || 'Not selected'}</Typography>
      </Box>

      {/* Submit Button */}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
        sx={{ mt: 3 }}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Submit Project'}
      </Button>
    </Box>
  );
};

export default SubmitProjectStep;
