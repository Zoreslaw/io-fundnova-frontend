import React from "react";
import "./ProjectCard.css";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fundingGoal: number;
  fundsRaised: number;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const progress = Math.min((project.fundsRaised / project.fundingGoal) * 100, 100);

  return (
    <div className="project-card">
      {/* Image Section */}
      <div className="project-image">
        <img src={project.imageUrl} alt={project.title} />
        <div className="overlay">
          <p className="project-description">{project.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <div className="progress-content">
            <p className="funding-info">
                ${project.fundsRaised} / ${project.fundingGoal}
            </p>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
