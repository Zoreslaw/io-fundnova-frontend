import React from "react";
import { Project } from "../../types/Project";
import showdown from "showdown";

interface ProjectDisplayProps extends Project {
  mode: "view" | "preview";
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  title,
  description,
  imageURL,
  tags,
  category,
  fundingGoal,
  fundsRaised,
  views,
  backers,
  deadline,
  story,
  rewards,
  mode,
}) => {
  const progressPercentage = fundsRaised
    ? Math.min((fundsRaised / fundingGoal) * 100, 100)
    : 0;
    const converter = new showdown.Converter();

  return (
    <div className="project-display">
      {/* Content */}
      <h1>{title}</h1>
      <div
        className="project-story"
        dangerouslySetInnerHTML={{ __html: converter.makeHtml(story) }}
      ></div>
      <img src={imageURL} alt={`${title} cover`} />
      {/* Other details */}
    </div>
  );
};

export default ProjectDisplay;
