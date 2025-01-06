import React from "react";
import { useNavigate } from "react-router-dom";
import BaseProjectCard from "./BaseProjectCard";
import "./HomepageProjectCard.css"; // TODO? : Maybe new style?

interface Project {
    id: string;
    title: string;
    description: string;
    url: string;
    fundingGoal: number;
    fundsRaised: number;
    deadline: string;
  }

const SearchpageProjectCard: React.FC<{project: Project}> = ({project}) => {
    const navigate = useNavigate();
    
    const openProject = () => {
        navigate(`/projects/${project.id}`);
    };

    return (
        <BaseProjectCard
            onClick={openProject}
            project={project}
            className="searchpage-project-card"
            renderOverlay={(project) => <p className="project-description">{project.description}</p>}
    />
    );
};

export default SearchpageProjectCard;