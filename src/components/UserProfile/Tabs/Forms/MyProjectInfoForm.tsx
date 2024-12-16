import React from "react";
import "./MyProjectInfoForm.css";
import { useNavigate } from "react-router-dom";

interface MyProjectInfoFormProps {
  project: any;
  onClose: () => void;
}

const MyProjectInfoForm: React.FC<MyProjectInfoFormProps> = ({
  project,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleEditProject = () => {
    navigate(`/edit-project/${project.id}`);
  };

  return (
    <div className="project-info-form">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <h3>{project.title}</h3>
      <ul>
        <li><strong>Deadline:</strong> {project.deadline}</li>
        <li><strong>Funds Raised:</strong> ${project.fundsRaised} / ${project.fundingGoal}</li>
        <li><strong>Number of Backers:</strong> {project.numberOfBackers}</li>
        <li><strong>Views:</strong> {project.numberOfViews}</li>
      </ul>
      <button className="edit-button" onClick={handleEditProject}>
        Edit
      </button>
    </div>
  );
};

export default MyProjectInfoForm;
