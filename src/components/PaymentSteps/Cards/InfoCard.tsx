import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  SxProps,
  Theme,
  CardActionArea,
  Collapse,
  Button,
  Stack,
  IconButton,
  InputBase,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { cardLabel } from "../types/cardLabel";

interface InfoCardProps {
  sx?: SxProps<Theme> | undefined;
  updateAction: (newInfo: string) => void;
  cardLabel: cardLabel;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const InfoCard: React.FC<InfoCardProps> = ({
  sx,
  onClick,
  cardLabel,
  updateAction,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [inputData, setInputData] = React.useState(cardLabel.value);
  const [error, setError] = React.useState<string | null>(null); // To track validation errors

  const handleExpandClick = () => {
    setExpanded(!expanded);
    onClick;
  };

  const handleEditClick = async () => {
    // Email-specific validation
    if (cardLabel.label.toLowerCase() === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputData)) {
        setError("Invalid email format. Please provide a valid email.");
        return;
      }
    }

    setError(null); // Clear any previous errors
    await updateAction(inputData);
    setExpanded(false);
  };

  return (
    <Card
      sx={{
        ...sx,
        mb: 2,
        boxShadow: 3,
        flexDirection: "column",
        width: "100%",
      }}
    >
      <CardActionArea onClick={handleExpandClick}>
        <CardContent>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
              <Typography variant="h6">{cardLabel.label}:</Typography>
              <Typography fontSize={"20px"} variant={"body1"}>
                {cardLabel.value ? cardLabel.value : "None"}
              </Typography>
            </Stack>

            <IconButton aria-label="edit">
              <EditNoteIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            gap={"2px"}
            alignItems={"center"}
          >
            <Box
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                border: 2,
                borderColor: "#545454",
                borderRadius: 2,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, p: 0.5 }}
                placeholder={cardLabel.label}
                inputProps={{ "aria-label": cardLabel.label }}
                value={inputData}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setInputData(event.target.value);
                }}
              />
            </Box>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </Stack>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default InfoCard;
