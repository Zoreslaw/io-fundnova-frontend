import React, { useEffect, useState } from "react";
import {Alert, Box, Fade, Skeleton, Stack, Typography} from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";
import { useAdvancedInfo } from "../../../hooks/useAdvancedInfo";
import InfoCard from "../Cards/InfoCard";
import PaymentMethodCard from "../Cards/PaymentMethodCard";
import { usePayment } from "../../../contexts/PaymentContext";

interface PaymentMethodFormProps {
    onChange: (isValid: boolean) => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({onChange}) => {
    const { setPaymentMethod, setPaymentInfo } = usePayment();
    const {user} = useAuth();
    const {info, isLoading, error, loadAdvancedInfo, updatePayment, updatePaymentInfo} = useAdvancedInfo(user!); // Include loadAdvancedInfo
    //const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    //const [isPaymentMethodValid, setIsPaymentMethodValid] = useState(false);
    //const [isPaymentInfoValid, setIsPaymentInfoValid] = useState(false);
    const [areAllFieldsValid, setAreAllFieldsValid] = useState(false);
    const [isDataReady, setIsDataReady] = useState(false);

    useEffect(() => {
        // Ensure advanced info is loaded when the component mounts
        if (!info) {
            loadAdvancedInfo();
        }
    }, [loadAdvancedInfo]);

    /*useEffect(() => {
        // Track if data has successfully loaded at least once
        if (!isLoading && info) {
            setHasLoadedOnce(true);
        }
    }, [isLoading, info]);*/

    // Validate form fields when data changes
    useEffect(() => {
        if (!isLoading) {
            //setIsPaymentMethodValid(!!info?.paymentMethod);
            //setIsPaymentInfoValid(!!info?.paymentInfo);

            const allFieldsValid = !!info?.paymentMethod && !!info?.paymentInfo;

            if (info?.paymentMethod) setPaymentMethod(info.paymentMethod);
            if (info?.paymentInfo) setPaymentInfo(info.paymentInfo);

            //setIsEmailValid(emailValid);
            setAreAllFieldsValid(allFieldsValid);

            onChange(allFieldsValid);
            //onChange(true);

            /*
            if (requiresAllFields) {
                onChange(allFieldsValid);
            } else if (requiresEmailOnly) {
                onChange(emailValid);
            } else {
                onChange(true);
            }*/

            setIsDataReady(true); // rest code
        }
    }, [isLoading, onChange]);


    return (
        <Box>
            {isLoading && !isDataReady ? (
                <Fade in={true}>
                    <Stack spacing={2}>
                        {/* Skeleton placeholders for smooth transitions */}
                        {[...Array(2)].map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                animation="wave"
                                height={72}
                                sx={{ borderRadius: 2 }}
                            />
                        ))}
                    </Stack>
                </Fade>
            ) : error ? (
                <Fade in={true}>
                    <Typography color="error">Failed to load information: {error}</Typography>
                </Fade>
            ) : info? (
                <Fade in={isDataReady}>
                    <Stack spacing={2}>
                        {isDataReady && !areAllFieldsValid && (
                            <Alert severity="warning">
                                Please complete all required fields (Payment method, Payment information) to proceed.
                            </Alert>
                        )}

                        <PaymentMethodCard
                            cardLabel={{label: "Payment method", value: info?.paymentMethod}}
                            updateAction={(method) => {
                                updatePayment(method);
                                setPaymentMethod(method);
                            }}
                        />
                        <InfoCard
                            cardLabel={{label: "Payment information", value: info?.paymentInfo}}
                            updateAction={(info) => {
                                updatePaymentInfo(info);
                                setPaymentInfo(info);
                            }}
                        />
                    </Stack>
                </Fade>
            ) : (
                <Typography>No information available.</Typography>
            )}
        </Box>
    );
};

export default PaymentMethodForm;