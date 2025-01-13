import React from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../contexts/ProjectContext";
import ProjectDisplay from "../components/ProjectDisplay/ProjectDisplay";
import { Box, Button } from "@mui/material";

const PreviewProjectPage: React.FC = () => {
  const { project } = useProject();
  const navigate = useNavigate();

  if (!project) {
    console.log("No project data available for preview.");
    return <p>No project data available for preview.</p>;
  }

  const handleBackToEdit = () => {
    navigate("/create-project");
  };

  return (
    <Box sx={{ 
      // padding: 3, 
      // backgroundColor: "#f4f4f4", 
      minHeight: "100vh" 
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBackToEdit}
        >
          Back to Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => alert("Submitting...")}
        >
          Submit Project
        </Button>
      </Box>
      <ProjectDisplay {...project} mode="preview" />
    </Box>
  );
};

export default PreviewProjectPage;
