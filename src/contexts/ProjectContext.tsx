import React, { createContext, useContext, useState } from "react";
import { Project } from "../types/Project";

interface ProjectContextProps {
  project: Project | null;
  setProject: (project: Project | null) => void;
  clearProject: () => void;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<Project | null>(null);

  const clearProject = () => {
    console.log("Clearing project data");
    setProject(null);
  };

  return (
    <ProjectContext.Provider value={{ project, setProject, clearProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextProps => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
