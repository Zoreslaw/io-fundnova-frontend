import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDisplay from "../components/ProjectDisplay/ProjectDisplay";
import axios from "axios";
import { Project } from "../types/Project";

const ViewProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    axios.get(`/api/projects/${id}`).then((response) => setProject(response.data));
  }, [id]);

  return project ? <ProjectDisplay {...project} mode="view" /> : <div>Loading...</div>;
};

export default ViewProjectPage;
