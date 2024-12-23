import React, { useState } from "react";
import { Project } from "../../types/Project";
import RewardDisplay from "./RewardDisplay";
import FundingStats from "./FundingStats";
import StoryDisplay from "./StoryDisplay";
import TagsDisplay from "./TagsDisplay";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import "./ProjectDisplay.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0056b3" },
    background: { default: "#2a2a2a", paper: "#333333" },
    text: { primary: "#d8d8d8", secondary: "#b0b0b0" },
  },
});

interface ProjectDisplayProps extends Project {
  mode: "view" | "preview";
  onEdit?: () => void;
  onSubmit?: () => void;
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  title,
  description,
  imageURL,
  tags,
  fundingGoal,
  fundsRaised = 0,
  backers = 0,
  deadline,
  story,
  rewards,
  mode,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="project-display" sx={{ padding: 3 }}>
        {/* Заголовок */}
        <Box sx={{ marginBottom: 4, textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 2, color: "#b0b0b0" }}
          >
            {description}
          </Typography>
        </Box>

        {/* Центрированный контейнер */}
        <Box
          className="project-main-container"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Мобильный column, desktop row
            alignItems: { xs: "center", md: "flex-start" }, // Центровка на мобильных
            justifyContent: "center", // Центрирование на desktop
            gap: 4,
            marginBottom: 5,
          }}
        >
          {/* Левая колонка (изображение + теги) */}
          <Box
            sx={{
              flex: 2,
              maxWidth: { xs: "100%", md: "60%" },
              textAlign: { xs: "center", md: "left" }, // Центр текста на мобильных
              order: { xs: 1, md: 0 }, // На мобильных идет первой
            }}
          >
            {imageURL && (
              <img
                src={imageURL}
                alt={`${title} cover`}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                }}
              />
            )}
            {tags && <TagsDisplay tags={tags} />}
          </Box>

          {/* Правая колонка (FundingStats) */}
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: "30%" },
              textAlign: "left",
              width: "100%",
              order: { xs: 2, md: 0 }, // На мобильных идет после
            }}
          >
            <FundingStats
              fundsRaised={fundsRaised}
              fundingGoal={fundingGoal}
              backers={backers}
              deadline={deadline}
            />
            {mode === "view" && (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 2,
                  width: "100%",
                }}
              >
                Back This Project
              </Button>
            )}
          </Box>
        </Box>

        {/* Табуляция */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ marginBottom: 3 }}
        >
          <Tab label="Campaign" />
          <Tab label="Rewards" />
          <Tab label="FAQ" disabled={mode === "preview"} />
          <Tab label="Updates" disabled={mode === "preview"} />
          <Tab label="Comments" disabled={mode === "preview"} />
        </Tabs>

        {/* Содержимое вкладок */}
        <Box className="tab-content">
          {activeTab === 0 && (
            <Box>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Campaign
              </Typography>
              <StoryDisplay story={story} />
            </Box>
          )}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Rewards
              </Typography>
              {rewards?.length ? (
                <RewardDisplay rewards={rewards} />
              ) : (
                <Typography>No rewards available.</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProjectDisplay;
