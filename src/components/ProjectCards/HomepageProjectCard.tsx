import React from "react";
import BaseProjectCard from "./BaseProjectCard";
import "./HomepageProjectCard.css";

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  fundingGoal: number;
  fundsRaised: number;
  deadline: string;
}


const HomepageProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <BaseProjectCard
      project={project}
      className="homepage-project-card"
      renderOverlay={(project) => <p className="project-description">{project.description}</p>}
    />
  );
};

export default HomepageProjectCard;
