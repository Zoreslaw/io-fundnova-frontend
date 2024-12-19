import React from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../contexts/ProjectContext";
import { createProjectApi } from "../utils/projectsApi";

const CreateProjectPage: React.FC = () => {
  const { setProject } = useProject();
  const navigate = useNavigate();

  const handleCreateProject = async (projectData: any) => {
    try {
      const newProject = await createProjectApi(projectData);
      setProject(newProject); // Share state via context
      navigate("/preview-project");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = {
            title: "Sample Project",
            description: "Sample Description",
            // ...rest of the form data
          };
          handleCreateProject(formData);
        }}
      >
        {/* Add your form fields here */}
        <button type="submit">Create and Preview</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
