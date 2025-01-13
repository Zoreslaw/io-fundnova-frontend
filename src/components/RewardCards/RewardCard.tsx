import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  SxProps,
  Theme,
  CardActionArea,
  CardMedia,
  Collapse,
  Button,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useNavigate, useParams } from "react-router-dom"; // Import navigate

interface RewardCardProps {
  reward: {
    title: string;
    price: number;
    contents: boolean | string;
    description?: string;
    imageUrl?: string | null;
    count?: number;
    deadline?: string;
  };
  sx?: SxProps<Theme> | undefined;
  onClick?: () => void;
  isSelected?: boolean; // Highlight the selected card
}

const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  sx,
  onClick,
  isSelected,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (onClick) {
      onClick(); // Trigger the parent logic for selection
    }
  };

  const handleBuyClick = () => {
    if (onClick) onClick(); // Ensure reward is selected in parent before navigating
    navigate(`/projects/${projectId}/back-project/payment`);
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
        {reward.imageUrl && (
          <CardMedia
            component="img"
            sx={{ backgroundColor: "grey.300" }}
            width={"100%"}
            image={reward.imageUrl}
            alt={reward.title}
          />
        )}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {reward.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Pledge Amount:</strong> ${reward.price}
          </Typography>
          {reward.description && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {reward.description}
            </Typography>
          )}
          {reward.deadline && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: 1 }}>
              <EventIcon color="primary" />
              <Typography variant="body2">Deadline: {reward.deadline}</Typography>
            </Box>
          )}
          {reward.count && (
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: 1 }}>
              <InventoryIcon color="secondary" />
              <Typography variant="body2">Available: {reward.count}</Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LocalOfferIcon color="success" />
            <Typography variant="body2">
              Content: {reward.contents === "True" ? "Physical Item" : "Digital Content"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            onClick={handleBuyClick} // Navigate to payment
          >
            Buy
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RewardCard;
