import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectData } from "../hooks/useProjectData";
import { updateProjectApi } from "../utils/projectsApi";

const EditProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, fetchProject, isLoading, error } = useProjectData();
  const navigate = useNavigate();


//   alert(projectId) ;

  useEffect(() => {
    if (projectId) {
      fetchProject(Number(projectId), "edit");
    }
  }, [projectId, fetchProject]);

  const handleEditProject = async (updatedData: any) => {
    try {
      await updateProjectApi(updatedData);
      navigate("/preview-project");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (isLoading) return <p>Loading project for editing...</p>;
  if (error) return <p>Error: {error}</p>;

  return project ? (
    <div>
      <h1>Edit Project</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const updatedData = {
            ...project,
            title: "Updated Project Title", // Example update
          };
          handleEditProject(updatedData);
        }}
      >
        {/* Add form fields pre-filled with `project` data */}
        <button type="submit">Save and Preview</button>
      </form>
    </div>
  ) : (
    <p>No project to edit.</p>
  );
};

export default EditProjectPage;
