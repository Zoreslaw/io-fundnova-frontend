export const getRecentProjects = async () => {
    const response = await fetch("https://localhost:7225/api/projects/recent");
    if (!response.ok) {
      throw new Error("Failed to fetch recent projects");
    }
    return response.json();
  };

  //TODO:
    //getProjectById(id: string)
    //createProject(data: ProjectPayload)
    //deleteProject(id: string)