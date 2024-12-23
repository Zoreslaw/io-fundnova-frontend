import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

interface RewardCardProps {
  reward: {
    title: string;
    price: number;
    contents: boolean;
    description?: string;
    imageURL?: string | null;
    count?: number;
    deadline?: string;
  };
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  return (
    <Card sx={{ mb: 2, boxShadow: 3, flexDirection: "column", width: "100%" }}>
      {reward.imageURL && (
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
            backgroundColor: "grey.300",
          }}
        >
          <img
            src={reward.imageURL}
            alt={reward.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
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
        {reward.count !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", mb: 1 }}>
            <InventoryIcon color="secondary" />
            <Typography variant="body2">Available: {reward.count}</Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LocalOfferIcon color="success" />
          <Typography variant="body2">
            Content: {reward.contents ? "Physical Item" : "Digital Content"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RewardCard;
