import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectData } from "../hooks/useProjectData";
import ProjectDisplay from "../components/ProjectDisplay/ProjectDisplay";

const ViewProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, fetchProject, isLoading, error } = useProjectData();

  useEffect(() => {
    if (projectId) {
      fetchProject(Number(projectId), "view");
    }
  }, [projectId, fetchProject]);

  if (isLoading) return <p>Loading project...</p>;
  if (error) return <p>Error: {error}</p>;

  return project ? <ProjectDisplay {...project} mode="view" /> : <p>No project found.</p>;
};

export default ViewProjectPage;
