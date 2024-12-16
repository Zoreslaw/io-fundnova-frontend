import { useState, useEffect } from "react";
import { getBackedProjects } from "../utils/projectsApi";

export const useBackedProjects = (userId: string | null) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchBackedProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getBackedProjects(userId);
        setProjects(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch backed projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBackedProjects();
  }, [userId]);

  return { projects, isLoading, error };
};
