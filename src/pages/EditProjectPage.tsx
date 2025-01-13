import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { CreateProjectProvider, useCreateProjectContext } from '../contexts/CreateProjectContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TagsForm from '../components/TagsForm/TagsForm';
import ProjectEditDetailsForm from '../components/ProjectEditDetailsForm/ProjectEditDetailsForm';
import EditRewardForm from '../components/EditRewardForm/EditRewardForm';
import PaymentMethodsForm from '../components/PaymentMethodsForm/PaymentMethodsForm';
import SubmitProjectStep from '../components/SubmitProjectStep/SubmitProjectStep';
import { Box, Typography } from '@mui/material';
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


const tabs = [  
  {label: 'Tags Selection', component: <TagsForm />},  
  { label: 'Project Details', component: <ProjectEditDetailsForm /> },
  { label: 'Rewards Setup', component: <EditRewardForm onUpdate={() => {}} /> },
  { label: 'Payment Method', component: <PaymentMethodsForm onUpdate={() => {}} /> },
  { label: 'Review & Submit', component: <SubmitProjectStep /> },
];

const CreateProjectPage: React.FC = () => {
  const { state } = useCreateProjectContext();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
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
          {tabs[currentTab].label}
        </Typography>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', mb: 2 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Box>
        {tabs[currentTab].component}
      </Box>
    </ThemeProvider>
  );
};

export default CreateProjectPage;
