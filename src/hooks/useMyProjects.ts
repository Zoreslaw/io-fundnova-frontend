import { useState, useEffect } from "react";
import { getMyProjects } from "../utils/projectsApi";

export const useMyProjects = (userId: string | null) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchMyProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getMyProjects(userId);
        setProjects(data.list);
      } catch (err: any) {
        console.log('err',err)
        const msg = err?.message.split(":")[1].trim();
        setError(msg || "Failed to fetch user projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyProjects();
  }, [userId]);

  const clearError = () => {
    setError(null);
  };

  return { projects, isLoading, error, clearError };
};
