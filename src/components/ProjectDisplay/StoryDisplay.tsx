import React from "react";
import { Typography } from "@mui/material";
import showdown from "showdown";

interface StoryDisplayProps {
  story: string;
}

const converter = new showdown.Converter();

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story }) => {
  const htmlContent = converter.makeHtml(story);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#b0b0b0",
      }}
    ></div>
  );
};

export default StoryDisplay;
