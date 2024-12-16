import React, { useState, useEffect } from "react";
import "./MyProjectsTab.css";
import ProfileProjectCard from "../../ProjectCards/ProfileProjectCard";
import { useMyProjects } from "../../../hooks/useMyProjects";
import { useAuth } from "../../../contexts/AuthContext";

const MyProjectsTab: React.FC = () => {
  const { user } = useAuth();

  const { projects, isLoading, error } = useMyProjects(user?.userId || null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [infoPanelIsOpen, setInfoPanelIsOpen] = useState<boolean>(false);
  const [isContentVisible, setIsContentVisible] = useState(false);


  useEffect(() => {
    if (!isLoading) {
      setIsContentVisible(true);
    } else {
      setIsContentVisible(false);
    }
  }, [isLoading]);

  const handleSelectProject = (project: any) => {
    if (infoPanelIsOpen) {
        setInfoPanelIsOpen(false);
        setTimeout(() => {
            setSelectedProject(project);
            setInfoPanelIsOpen(true);
        }, 300)
    } else {
        setSelectedProject(project);
        setInfoPanelIsOpen(true);
    }
  };

  // const handleClosePanel = () => {
  //   setSelectedProject(null);
  // };

  // if (isLoading) return <div className="loading">Loading projects...</div>;

  if (error) return <div className="error">{error}</div>;

  console.log(projects.map((project) =>
    console.log(project)));

  return (
    <div className="my-projects-tab">
      <div className={`infoContentWrapper ${isContentVisible ? "fade-in" : "fade-out"}`}>
        <h3>My Projects</h3>

        <div className={`info-panel ${infoPanelIsOpen ? "active" : ""}`}>
            <>
              <h3>{selectedProject?.title}</h3>
              <p>Description: {selectedProject?.description}</p>
              <p>Deadline: {selectedProject?.deadline}</p>
              <p>
                Funds Raised: ${selectedProject?.fundsRaised} / $
                {selectedProject?.fundingGoal}
              </p>
              <p>Number of Backers: {selectedProject?.backersCount}</p>
              <p>Views: {selectedProject?.viewsCount}</p>
              <button
                className="edit-button"
                onClick={() => (window.location.href = `/edit-project/${selectedProject?.id}`)}
              >
                Edit
              </button>
              <button className="close-button" onClick={() => setInfoPanelIsOpen(false)}>
                Close
              </button>
            </>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProfileProjectCard
              key={project.id}
              project={project}
              onClick={() => handleSelectProject(project)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProjectsTab;
