import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  Modal,
  CircularProgress,
  Card,
  CardHeader,
} from "@mui/material";
import { Reward } from "../../../types/Reward";
import { usePayment } from "../../../contexts/PaymentContext";
import { processPaymentApi } from "../../../utils/paymentApi";
import { useNavigate } from "react-router-dom";

interface ConfirmPaymentFormProps {
  reward: Reward | null;
  pledgeAmount: number | null;
}

const ConfirmPaymentForm: React.FC<ConfirmPaymentFormProps> = ({
  reward,
  pledgeAmount,
}) => {
  const { paymentInfo, paymentMethod } = usePayment();




  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          mb: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Pledge Summary
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body1" color="text.secondary">
              Reward:
            </Typography>
            <Typography variant="body2">
              {reward?.title || "No Reward Selected"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="text.secondary">
              Pledge Amount:
            </Typography>
            <Typography variant="body2">
              ${reward?.price || pledgeAmount || "0.00"}
            </Typography>
          </Box>
        </Stack>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          mb: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Payment
        </Typography>
        <Stack spacing={2}>
          <Card variant="outlined">
            <CardHeader
              title={`Card ending in ${paymentInfo?.slice(-4) || "****"}`}
              subheader={`Payment method: ${paymentMethod || "N/A"}`}
            />
          </Card>
        </Stack>
      </Paper>
      {/* <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConfirmPayment}
        disabled={isProcessing}
      >
        Confirm Payment
      </Button> */}
    </Box>
  );
};

export default ConfirmPaymentForm;
