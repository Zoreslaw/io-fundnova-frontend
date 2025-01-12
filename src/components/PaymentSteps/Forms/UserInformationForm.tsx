import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Skeleton, Fade } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";
import { useAdvancedInfo } from "../../../hooks/useAdvancedInfo";
import { useBasicInfo } from "../../../hooks/useBasicInfo";
import InfoCard from "../Cards/InfoCard";
import { Alert } from "@mui/material"; // Import Alert component

interface UserInformationFormProps {
  onChange: (isValid: boolean) => void;
  requiresAllFields: boolean;
  requiresEmailOnly: boolean;
}

const UserInformationForm: React.FC<UserInformationFormProps> = ({
  onChange,
  requiresAllFields,
  requiresEmailOnly,
}) => {
  const { user } = useAuth();

  const [isEmailValid, setIsEmailValid] = useState(false); // Track email validity
  const [areAllFieldsValid, setAreAllFieldsValid] = useState(false); // Track all fields validity


  // Advanced Info
  const {
    info: advancedInfo,
    isLoading: isAdvancedLoading,
    error: advancedError,
    loadAdvancedInfo,
    updateName,
    updateSurname,
    updateAddress,
  } = useAdvancedInfo(user!);

  // Basic Info
  const {
    info: basicInfo,
    isLoading: isBasicLoading,
    error: basicError,
    loadBasicInfo,
    updateEmail,
  } = useBasicInfo(user!);

  const [isDataReady, setIsDataReady] = useState(false);

  // Load data on mount
  useEffect(() => {
    if (user) {
      if (!basicInfo) {
        loadBasicInfo();
      }
      if (!advancedInfo) {
        loadAdvancedInfo();
      }
    }
  }, [user, basicInfo, advancedInfo, loadBasicInfo, loadAdvancedInfo]);

  // Validate form fields when data changes
  useEffect(() => {
    if (!isAdvancedLoading && !isBasicLoading) {
      const emailValid = !!basicInfo?.email;
      const allFieldsValid =
        !!advancedInfo?.name &&
        !!advancedInfo?.surname &&
        !!advancedInfo?.address &&
        emailValid;

      setIsEmailValid(emailValid);
      setAreAllFieldsValid(allFieldsValid);

      if (requiresAllFields) {
        onChange(allFieldsValid);
      } else if (requiresEmailOnly) {
        onChange(emailValid);
      } else {
        onChange(true);
      }

      setIsDataReady(true);
    }
  }, [isAdvancedLoading, isBasicLoading, basicInfo, advancedInfo, requiresAllFields, requiresEmailOnly, onChange]);


  // Handle combined loading and error states
  const isLoading = isAdvancedLoading || isBasicLoading;
  const error = advancedError || basicError;

  return (
    <Box>
      {isLoading && !isDataReady ? (
        <Fade in={true}>
          <Stack spacing={2}>
            {/* Skeleton placeholders for smooth transitions */}
            {[...Array(4)].map((_, index) => (
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
      ) : (
        <Fade in={isDataReady}>
            <Stack spacing={2}>
                {/* Display an alert if fields are invalid */}
                {isDataReady && !isEmailValid && requiresEmailOnly && (
                <Alert severity="warning">
                    Please provide a valid email address to continue.
                </Alert>
                )}
                {isDataReady && !areAllFieldsValid && requiresAllFields && (
                <Alert severity="warning">
                    Please complete all required fields (Name, Surname, Address, and Email) to proceed.
                </Alert>
                )}
                {/* Advanced Info */}
                <InfoCard
                cardLabel={{ label: "Name", value: advancedInfo?.name }}
                updateAction={updateName}
                />
                <InfoCard
                cardLabel={{ label: "Surname", value: advancedInfo?.surname }}
                updateAction={updateSurname}
                />
                <InfoCard
                cardLabel={{ label: "Address", value: advancedInfo?.address }}
                updateAction={updateAddress}
                />
                {/* Basic Info */}
                <InfoCard
                cardLabel={{ label: "Email", value: basicInfo?.email }}
                updateAction={updateEmail}
                />
            </Stack>
        </Fade>

      )}
    </Box>
  );
};

export default UserInformationForm;
