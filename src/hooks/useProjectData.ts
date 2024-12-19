import { useState, useEffect, useCallback } from "react";
import { getProjectById, getProjectForEdit } from "../utils/projectsApi";
// import { ProjectEditPayload } from "../types/ProjectsPayload";
import { Project } from "../types/Project";

interface UseProjectDataReturn {
  project: Project | null;
  isLoading: boolean;
  error: string | null;
  fetchProject: (projectId: number, mode: "view" | "edit") => Promise<void>;
  clearProject: () => void;
}

export const useProjectData = (): UseProjectDataReturn => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(
    async (projectId: number, mode: "view" | "edit") => {
        setIsLoading(true);
        setError(null);
        try {
        const data =
            mode === "view"
            ? await getProjectById(projectId)
            : await getProjectForEdit(projectId);
        setProject(data);
        } catch (err: any) {
        setError(err.message || "Failed to fetch project data");
        } finally {
        setIsLoading(false);
        }
    },
    []
  );


  const clearProject = () => setProject(null);

  return { project, isLoading, error, fetchProject, clearProject };
};
