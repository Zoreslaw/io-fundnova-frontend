import { useState, useEffect } from "react";
import { getRecentProjects } from "../utils/projectsApi";

export const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getRecentProjects();
        setProjects(data.list);
      } catch (err: any) {
        console.log('err',err)
        const msg = err?.message.split(":")[1].trim();
        setError(msg || "Failed to fetch projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentProjects();
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { projects, isLoading, error, clearError };
};
