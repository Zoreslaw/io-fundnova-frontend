import React, { createContext, useContext, useState } from "react";
import { ProjectCreatePayload, ProjectEditPayload } from "../types/ProjectsPayload";

interface ProjectContextProps {
  project: ProjectCreatePayload | ProjectEditPayload | null;
  setProject: (project: ProjectCreatePayload | ProjectEditPayload | null) => void;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<ProjectCreatePayload | ProjectEditPayload | null>(null);

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
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
