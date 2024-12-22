import React from "react";
import { Button, Box } from "@mui/material";

interface StepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled: boolean; // Новый пропс для проверки валидности шага
}

const StepNavigator: React.FC<StepNavigatorProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled,
}) => {
  return (
    <Box display="flex" justifyContent="space-between" mt={3} sx={{ marginTop: 5 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={onBack}
        disabled={currentStep === 0}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onNext}
        disabled={isNextDisabled || currentStep === totalSteps - 1}
      >
        {currentStep === totalSteps - 1 ? "Finish" : "Next"}
      </Button>
    </Box>
  );
};


export default StepNavigator;
