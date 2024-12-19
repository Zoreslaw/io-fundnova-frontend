// import React, { useState, useEffect } from "react";
// import "./MyProjectsTab.css";
// import ProfileProjectCard from "../../ProjectCards/ProfileProjectCard";
// import { useAuth } from "../../../contexts/AuthContext";
// import { useBackedProjects } from "../../../hooks/useBackedProjects";

// const BackedProjectsTab: React.FC = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return <p>Loading user information...</p>;
//   }

//   const { projects, isLoading, error } = useBackedProjects(user?.userId || null);
//   const [selectedProject, setSelectedProject] = useState<any | null>(null);
//   const [isContentVisible, setIsContentVisible] = useState(false);

//   useEffect(() => {
//     if (!isLoading) {
//       setIsContentVisible(true);
//     } else {
//       setIsContentVisible(false);
//     }
//   }, [isLoading]);

//   const handleRedirectToTransaction = (projectId: string) => {
//     window.location.href = `/transaction-summary/${projectId}`;
//   };

//   const handleCloseDetails = () => setSelectedProject(null);

//   // if (isLoading) {
//   //   return <div className="loading">Loading backed projects...</div>;
//   // }

//   switch (error) {
//     case "Could not find any projects.":
//       return (
//         <div style={
//           {color: "#d8d8d8"}        
//         }>
//           <h2>{error}</h2>
//         </div>
//       )
//     // default:
//     //   return <div className="error">{error}</div>
//   }

//   return (
//     <div className="my-projects-tab">
//       <div className={`infoContentWrapper ${isContentVisible ? "fade-in" : "fade-out"}`}>
//         <div className="backed-projects-tab">
//           <h3>Backed Projects</h3>
//           {selectedProject ? (
//             <div className="project-details">
//               <h4>{selectedProject.title}</h4>
//               <p>Funds contributed: ${selectedProject.fundsContributed?.toFixed(2)}</p>
//               <button
//                 onClick={() => handleRedirectToTransaction(selectedProject.projectId)}
//                 className="confirmButton"
//               >
//                 View Transaction Summary
//               </button>
//               <button onClick={handleCloseDetails} className="cancelButton">
//                 Back to List
//               </button>
//             </div>
//           ) : (
//             <div className="project-grid">
//               {projects.map((project) => (
//                 <ProfileProjectCard
//                   key={project.projectId}
//                   project={project}
//                   onClick={() => setSelectedProject(project)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BackedProjectsTab;

import React, { useState, useEffect } from "react";
import "./MyProjectsTab.css"; // Используем те же стили, что и в MyProjectsTab
import ProfileProjectCard from "../../ProjectCards/ProfileProjectCard";
import { useBackedProjects } from "../../../hooks/useBackedProjects";
import { useAuth } from "../../../contexts/AuthContext";

const BackedProjectsTab: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading user information...</p>;
  }

  const { projects, isLoading, error } = useBackedProjects(user?.userId || undefined);
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
      }, 300);
    } else {
      setSelectedProject(project);
      setInfoPanelIsOpen(true);
    }
  };

  const handleRedirectToTransaction = (projectId: string) => {
    window.location.href = `/transaction-summary/${projectId}`;
  };

  switch (error) {
    case "Could not find any projects.":
      return (
        <div style={{ color: "#d8d8d8", padding: "20px" }}>
          <h2>{error}</h2>
        </div>
      );
  }

  return (
    <div className="my-projects-tab">
      <div className={`infoContentWrapper ${isContentVisible ? "fade-in" : "fade-out"}`}>
        <h3>Backed Projects</h3>

        <div className={`info-panel ${infoPanelIsOpen ? "active" : ""}`}>
          {selectedProject && (
            <>
              <h3>{selectedProject?.title}</h3>
              <p>Description: {selectedProject?.description}</p>
              <p>Funds Contributed: ${selectedProject?.fundsContributed?.toFixed(2)}</p>
              <p>Number of Backers: {selectedProject?.backers}</p>
              <p>Views: {selectedProject?.views}</p>
              <button
                className="confirmButton"
                onClick={() => handleRedirectToTransaction(selectedProject.projectId)}
              >
                View Transaction Summary
              </button>
              <button
                className="close-button"
                onClick={() => setInfoPanelIsOpen(false)}
              >
                Close
              </button>
            </>
          )}
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProfileProjectCard
              key={project.projectId}
              project={project}
              onClick={() => handleSelectProject(project)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackedProjectsTab;
