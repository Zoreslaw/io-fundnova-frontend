import { useState, useEffect } from "react";
import { getBackedProjects } from "../utils/projectsApi";

export const useBackedProjects = (userId?: number) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchBackedProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getBackedProjects(userId);
        setProjects(data.list);
      } catch (err: any) {
        console.log('err',err)
        const msg = err?.message.split(":")[1].trim();
        setError(msg || "Failed to fetch backed projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBackedProjects();
  }, [userId]);

  const clearError = () => {
    setError(null);
  };


  return { projects, isLoading, error, clearError };
};
