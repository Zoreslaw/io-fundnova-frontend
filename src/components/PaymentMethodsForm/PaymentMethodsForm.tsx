import React, { useEffect, useState } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { useCreateProjectContext } from '../../contexts/CreateProjectContext';
import axios from 'axios';

const PaymentMethodsForm: React.FC = () => {
  const { state, setState } = useCreateProjectContext();
  const [paymentMethods, setPaymentMethods] = useState<string[]>(['Visa', 'Mastercard']);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get('/projects/fetchConfigurations');
        setPaymentMethods(response.data.PaymentMethods || ['Visa', 'Mastercard']);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handlePaymentMethodChange = (method: string) => {
    setState((prev) => ({
      ...prev,
      paymentInfo: { ...prev.paymentInfo, paymentMethod: method },
    }));
  };

  const handleCardNumberChange = (cardNumber: string) => {
    setState((prev) => ({
      ...prev,
      paymentInfo: { ...prev.paymentInfo, cardNumber },
    }));
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Select Payment Method
      </Typography>
      <RadioGroup
        value={state.paymentInfo?.paymentMethod}
        onChange={(e) => handlePaymentMethodChange(e.target.value)}
      >
        {paymentMethods.map((method, index) => (
          <FormControlLabel key={index} value={method} control={<Radio />} label={method} />
        ))}
      </RadioGroup>
      <TextField
        label="Card Number"
        type="text"
        fullWidth
        margin="normal"
        value={state.paymentInfo?.cardNumber || ''}
        onChange={(e) => handleCardNumberChange(e.target.value)}
      />
    </Box>
  );
};

export default PaymentMethodsForm;
