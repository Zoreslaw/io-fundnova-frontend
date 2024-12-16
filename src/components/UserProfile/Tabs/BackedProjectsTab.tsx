import React, { useState, useEffect } from "react";
import "./MyProjectsTab.css";
import ProfileProjectCard from "../../ProjectCards/ProfileProjectCard";
import { useAuth } from "../../../contexts/AuthContext";
import { useBackedProjects } from "../../../hooks/useBackedProjects";

const BackedProjectsTab: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading user information...</p>;
  }

  const { projects, isLoading, error } = useBackedProjects(user?.userId || null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsContentVisible(true);
    } else {
      setIsContentVisible(false);
    }
  }, [isLoading]);

  const handleRedirectToTransaction = (projectId: string) => {
    window.location.href = `/transaction-summary/${projectId}`;
  };

  const handleCloseDetails = () => setSelectedProject(null);

  // if (isLoading) {
  //   return <div className="loading">Loading backed projects...</div>;
  // }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="my-projects-tab">
      <div className={`infoContentWrapper ${isContentVisible ? "fade-in" : "fade-out"}`}>
        <div className="backed-projects-tab">
          <h3>Backed Projects</h3>
          {selectedProject ? (
            <div className="project-details">
              <h4>{selectedProject.title}</h4>
              <p>Funds contributed: ${selectedProject.fundsContributed?.toFixed(2)}</p>
              <button
                onClick={() => handleRedirectToTransaction(selectedProject.projectId)}
                className="confirmButton"
              >
                View Transaction Summary
              </button>
              <button onClick={handleCloseDetails} className="cancelButton">
                Back to List
              </button>
            </div>
          ) : (
            <div className="profile-project-list">
              {projects.map((project) => (
                <ProfileProjectCard
                  key={project.projectId}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackedProjectsTab;
