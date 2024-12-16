import React from "react";
import "./BaseProjectCard.css";
import CSS from 'csstype';

interface Project {
  id: string;
  title: string;
  description?: string;
  url: string;
  fundingGoal?: number;
  fundsRaised?: number;
  deadline?: string;
}

interface BaseProjectCardProps {
  project: Project;
  renderOverlay?: (project: Project) => React.ReactNode;
  renderContent?: (project: Project) => React.ReactNode;
  className?: string;
  paddingContentStyle?: CSS.Properties;
  fontSizeContentStyle?: CSS.Properties;
}

const BaseProjectCard: React.FC<BaseProjectCardProps> = ({
  project,
  renderOverlay,
  renderContent,
  className = "",
  paddingContentStyle,
  fontSizeContentStyle,
}) => {
  const progress =
    project.fundingGoal && project.fundsRaised
      ? Math.min((project.fundsRaised / project.fundingGoal) * 100, 100)
      : null;
    
  

  return (
    <div className={`base-project-card ${className}`}>
      <div className="project-image">
        <img src={project.url} alt={project.title} />
        {renderOverlay && <div className="overlay">{renderOverlay(project)}</div>}
      </div>
      <div className="project-content" style={(paddingContentStyle ? paddingContentStyle : ({padding: "20px", height: "40%"}))}>
        <div className="project-title">
          <h3 style={fontSizeContentStyle ?? fontSizeContentStyle}>{project.title}</h3>
        </div>
        {progress !== null && (
          <div className="progress-content">
            <p className="funding-info">
              ${project.fundsRaised?.toLocaleString()} / ${project.fundingGoal?.toLocaleString()}
            </p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ "--progress-width": `${progress}%` } as React.CSSProperties}
              ></div>
            </div>
          </div>
        )}
        {project.deadline && (
          <div className="deadline">
            <i className="material-icons deadline-icon">schedule</i>
            <span className="deadline-text">{project.deadline}</span>
          </div>
        )}
        {renderContent && renderContent(project)}
      </div>
    </div>
  );
};

export default BaseProjectCard;
