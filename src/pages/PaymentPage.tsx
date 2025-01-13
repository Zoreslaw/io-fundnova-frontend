import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Modal,
  CircularProgress,
} from "@mui/material";
import { Alert } from "@mui/material"; // Added to display error messages
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import UserInformationForm from "../components/PaymentSteps/Forms/UserInformationForm";
import PaymentMethodForm from "../components/PaymentSteps/Forms/PaymentMethodForm";
import ConfirmPaymentForm from "../components/PaymentSteps/Forms/ConfirmPaymentForm";
import { usePayment } from "../contexts/PaymentContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { processPaymentApi } from "../utils/paymentApi";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0056b3" },
    secondary: { main: "#3d3d3d" },
    background: { default: "#2a2a2a", paper: "#333333" },
    text: { primary: "#d8d8d8", secondary: "#b0b0b0" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { color: "#d8d8d8" },
    body1: { color: "#b0b0b0" },
  },
});

const PaymentPage: React.FC = () => {
  const { user, userId } = useAuth();
  const { project, reward, pledgeAmount, projectId } = usePayment();
  const [activeStep, setActiveStep] = useState(0);
  const [userInformationValid, setUserInformationValid] = useState(false); // Tracks form validity
  const[paymentMethodValid, setPaymentMethodValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const navigate = useNavigate();
  const { paymentInfo, paymentMethod } = usePayment();
  

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setStatus(null);
  
    try {
      await processPaymentApi({
        paymentMethod,
        paymentInfo,
        pledgeAmount,
        rewardId: reward?.rewardId || null,
        userId: (user?.userId)?.toString() || null, // Assuming `user` has an `id` property
        projectId: projectId || null, // Assuming `project` has an `id` property
      });
      setStatus("success");
      setIsProcessing(false);
      setTimeout(() => {
        navigate("/transaction-summary");
      }, 2000);
    } catch (error) {
      console.error("Payment failed:", error);
      setStatus("error");
      setIsProcessing(false);
    }
  };
  


  useEffect(()=>{
    if(!user){
        window.location.replace("http://localhost:5173/");
    }
  }, [user])

  useEffect(() => {
    console.log(project);
    console.log(reward);        
    console.log(pledgeAmount);
  },[project, reward, pledgeAmount])

  const steps = [
    {
      label: "User Information",
      component: (
        <UserInformationForm
          onChange={(isValid) => setUserInformationValid(isValid)} // Pass form state to parent
          requiresAllFields={!!reward?.contents} // Require all fields only if reward has physical contents
          requiresEmailOnly={!reward?.contents} // Require only email if reward does not have physical contents
        />
      ),
    },
    { label: "Payment Method", component: <PaymentMethodForm onChange={(isValid) => setPaymentMethodValid(isValid)} /> },
    {
      label: "Confirm Payment",
      component: <ConfirmPaymentForm reward={reward} pledgeAmount={pledgeAmount} />,
    },
  ];

  const handleNext = () => {
    if (activeStep === 0 && !userInformationValid) {
      return; // Block navigation if required information is not valid
    } else if (activeStep === 1 && !paymentMethodValid) {
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  if (!project || !reward) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        No project or reward selected. Please return to the project page.
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stepper activeStep={activeStep} sx={{ maxWidth: 1000, mx: "auto", mt: "5%" }} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          mt: 4,
          p: 3,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you're finished</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {steps[activeStep].component}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
                <Button
                    onClick={
                        activeStep === steps.length - 1
                        ? handleConfirmPayment
                        : handleNext
                    }
                    disabled={
                        (activeStep === 0 && !userInformationValid) ||
                        (activeStep === 1 && !paymentMethodValid) ||
                        isProcessing
                    }
                    >
                    {activeStep === steps.length - 1 ? "Confirm Payment" : "Next"}
                </Button>
            </Box>
          </React.Fragment>
        )}
        {/* Modal for processing feedback */}
        <Modal
            open={isProcessing || status !== null}
            onClose={()=>{}}
            aria-labelledby="payment-modal-title"
            aria-describedby="payment-modal-description"
        >
            <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                p: 4,
                borderRadius: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
            {isProcessing && (
                <>
                <CircularProgress />
                <Typography id="payment-modal-title" sx={{ mt: 2 }}>
                    Processing your payment...
                </Typography>
                </>
            )}
            {status === "success" && (
                <>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
                <Typography>Payment successful!</Typography>
                </>
            )}
            {status === "error" && (
                <>
                <ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
                <Typography color="error">Payment failed. Try again.</Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setStatus(null)}
                    sx={{ mt: 2 }}
                >
                    Retry
                </Button>
                </>
            )}
            </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentPage;
