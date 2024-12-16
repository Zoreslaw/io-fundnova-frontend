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
        console.warn(data);
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentProjects();
  }, []);

  return { projects, isLoading, error };
};
