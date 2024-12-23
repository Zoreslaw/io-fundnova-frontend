import React from "react";
import { Chip, Box } from "@mui/material";

interface TagsDisplayProps {
  tags: string[];
}

const TagsDisplay: React.FC<TagsDisplayProps> = ({ tags }) => (
  <Box>
    {tags.map((tag, index) => (
      <Chip key={index} label={tag} style={{ margin: "5px" }} />
    ))}
  </Box>
);

export default TagsDisplay;
