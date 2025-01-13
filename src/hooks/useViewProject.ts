import { useState, useEffect } from "react";
import { Project } from "../types/Project";
import { getProjectById } from "../utils/projectsApi";

export const useViewProject = (projectId: number) => {
  const [project, setProjects] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectById = async () => {
        setIsLoading(true);
        try {
            const data = await getProjectById(projectId);
            setProjects(data);
        } catch (err: any) {
            console.log('err',err)
            const msg = err?.message.split(":")[1].trim();
            setError(msg || "Failed to fetch project");
        } finally {
            setIsLoading(false);
        }
    };
  
    fetchProjectById();
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { project, isLoading, error, clearError };
};
