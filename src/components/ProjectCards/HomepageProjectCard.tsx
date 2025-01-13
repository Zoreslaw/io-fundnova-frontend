import React from "react";
import BaseProjectCard from "./BaseProjectCard";
import "./HomepageProjectCard.css";
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const openProjectHandler = () => {
    navigate(`./projects/${project.id}`);
  }

  return (
    <BaseProjectCard
      onClick={openProjectHandler}
      project={project}
      className="homepage-project-card"
      renderOverlay={(project) => <p className="project-description">{project.description}</p>}
    />
  );
};

export default HomepageProjectCard;
