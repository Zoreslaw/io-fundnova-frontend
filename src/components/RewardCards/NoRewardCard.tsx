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
  IconButton,
  InputBase,
  Divider,
  Stack,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SendIcon from "@mui/icons-material/Send";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";

interface NoRewardCardProps {
  sx?: SxProps<Theme> | undefined;
  onSetPledgeAmount: (amount: number) => void;
}

const NoRewardCard: React.FC<NoRewardCardProps> = ({ sx, onSetPledgeAmount }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [customAmount, setCustomAmount] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null); // For error messages
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAmountChange = (value: string | number) => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    // Validation logic
    if (numericValue < 1) {
      setError("Pledge amount must be at least 1.");
    } else {
      setError(null);
    }

    setCustomAmount(numericValue);
  };

  const handleContinueClick = () => {
    if (customAmount >= 1) {
      onSetPledgeAmount(customAmount);
      navigate(`/projects/${projectId}/back-project/payment`);
    }
  };

  return (

    

    <Card sx={{ ...sx, mb: 2, boxShadow: 3, flexDirection: "column", width: "100%" }}>
      <CardActionArea onClick={handleExpandClick}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pledge without a reward
          </Typography>
        </CardContent>
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack direction="row" justifyContent={"space-between"} gap={"2px"}>
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
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <AttachMoneyIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <NumericFormat
                value={customAmount}
                onValueChange={(values) => handleAmountChange(values.value)}
                customInput={InputBase}
                thousandSeparator="."
                decimalSeparator=","
                valueIsNumericString
                placeholder="Amount"
                inputProps={{ "aria-label": "amount" }}
                sx={{ ml: 1, flex: 1 }}
              />
            </Box>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleContinueClick}
              disabled={customAmount < 1 || !!error} // Disable if invalid
            >
              Continue
            </Button>
          </Stack>
          {error && <Typography color="error" mt={2}>{error}</Typography>}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default NoRewardCard;
