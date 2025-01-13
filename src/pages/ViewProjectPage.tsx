import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDisplay from "../components/ProjectDisplay/ProjectDisplay";
import axios from "axios";
import { Project } from "../types/Project";
import { useViewProject } from "../hooks/useViewProject";

const ViewProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isContentVisible, setIsContentVisible] = useState(false);
  // const [project, setProject] = useState<Project | null>(null);

  

  if(!projectId){
    return <div>Invalid project id</div>
  }
  
  const { project, isLoading, error } = useViewProject(+projectId);

  useEffect(() => {
    if (!isLoading) {
      setIsContentVisible(true);
      // console.log(project);
    } else {
      setIsContentVisible(false);
    }
  }, [isLoading]);

  // useEffect(() => {
  //   axios.get(`/api/projects/${projectId}`).then((response) => setProject(response.data));
  // }, [projectId]);

  // if (isLoading) return <p>Loading project for editing...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    (isContentVisible && project) && <ProjectDisplay {...project} mode="view" />
  );
};

export default ViewProjectPage;
