import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { CreateProjectProvider, useCreateProjectContext } from '../contexts/CreateProjectContext';
import StepNavigator from '../components/StopNavigator/StepNavigator';
import CategoryAndTagsForm from '../components/CategoryAndTagsForm/CategoryAndTagsForm';
import ProjectDetailsForm from '../components/ProjectDetailsForm/ProjectDetailsForm';
import RewardForm from '../components/RewardForm/RewardForm';
import PaymentMethodsForm from '../components/PaymentMethodsForm/PaymentMethodsForm';
import { Box, Typography } from '@mui/material';
import SubmitProjectStep from '../components/SubmitProjectStep/SubmitProjectStep';  

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

const steps = [
  {
    label: 'Category & Tags Selection',
    component: <CategoryAndTagsForm />,
  },
  { label: 'Project Details', component: <ProjectDetailsForm /> },
  { label: 'Rewards Setup', component: <RewardForm /> },
  { label: 'Payment Method', component: <PaymentMethodsForm /> },
  { label: 'Review & Submit', component: <SubmitProjectStep /> },
];

const CreateProjectPage: React.FC = () => {
  const { currentStep, setCurrentStep, state } = useCreateProjectContext();

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!state.category && state.tags.length > 0;
      case 1:
        return (
          state.title?.trim().length > 0 &&
          state.description?.trim().length > 0 &&
          !!state.story &&
          state.imageURL !== "" &&
          state.fundingGoal >= 100 &&
          new Date(state.deadline) >= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        );
      case 2:
        return state.rewards && state.rewards.length > 0;
      case 3:
        return (
          !!state.paymentInfo?.paymentMethod &&
          !!state.paymentInfo?.cardNumber &&
          state.paymentInfo.cardNumber.trim().length > 0
        );
      case 4:
        return true;
      default:
        return false;
    }
  };
  

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          mt: 4,
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {steps[currentStep].label}
        </Typography>
        {steps[currentStep].component}
        <StepNavigator
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onBack={handleBack}
          isNextDisabled={!validateStep(currentStep)}
        />
      </Box>
    </ThemeProvider>
  );
};

// const CreateProjectPageWithProvider: React.FC = () => {
//   return (
//     <CreateProjectProvider>
//       <CreateProjectPage />
//     </CreateProjectProvider>
//   );
// };

export default CreateProjectPage;
