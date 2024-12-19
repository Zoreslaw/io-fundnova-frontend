import React, { useState, useEffect } from "react";
import "./MyProjectsTab.css";
import ProfileProjectCard from "../../ProjectCards/ProfileProjectCard";
import { useMyProjects } from "../../../hooks/useMyProjects";
import { useAuth } from "../../../contexts/AuthContext";

const MyProjectsTab: React.FC = () => {
  const { user } = useAuth();

  const { projects, isLoading, error } = useMyProjects(user?.userId || undefined);
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

  switch (error) {
    case "Could not find any projects.":
      return (
        <div style={
          {color: "#d8d8d8", padding: "20px"}        
        }>
          <h2>{error}</h2>
        </div>
      )
    // default:
    //   return <div className="error">{error}</div>
  }


  // console.log(projects.map((project) =>
  //   console.log(project)));

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
              <p>Number of Backers: {selectedProject?.backers}</p>
              <p>Views: {selectedProject?.views}</p>
              <button
                className="confirmButton"
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
