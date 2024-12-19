import { ProjectCreatePayload, ProjectEditPayload } from "../types/ProjectsPayload";
import { convertToPascalCase, convertToCamelCase } from "../utils/caseConverters";

const API_BASE = "https://localhost:7225/api";

export const getBackedProjects = async (userId: number) => {
  try {
    const response = await fetch(`${API_BASE}/projects/backed/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertToPascalCase({ id: userId })),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Error fetching backed projects:", error.message);
    throw error;
  }
};

export const getMyProjects = async (userId: number) => {
  try {
    const response = await fetch(`${API_BASE}/projects/my/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertToPascalCase({ id: userId })),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Error fetching user projects:", error.message);
    throw error;
  }
};

export const getRecentProjects = async () => {
  try {
    const response = await fetch(`${API_BASE}/projects/recent`);

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Error fetching recent projects:", error.message);
    throw error;
  }
};

export const createProjectApi = async (payload: ProjectCreatePayload) => {
  try {
    const response = await fetch(`${API_BASE}/projects/create/`, {
      method: "POST",
      body: JSON.stringify(convertToPascalCase(payload)),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Creating project error:", error.message);
    throw error;
  }
};

export const getProjectById = async (projectId: number) => {
  try {
    const response = await fetch(`${API_BASE}/projects/view/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertToPascalCase({ projectId: projectId.toString() })),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Error fetching project:", error.message);
    throw error;
  }
};

export const getProjectForEdit = async (projectId: number) => {
  try {
    const response = await fetch(`${API_BASE}/projects/update/fetch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertToPascalCase({ projectId: projectId.toString() })),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Error fetching project:", error.message);
    throw error;
  }
};

export const updateProjectApi = async (payload: ProjectEditPayload) => {
  try {
    const response = await fetch(`${API_BASE}/projects/update/upload`, {
      method: "POST",
      body: JSON.stringify(convertToPascalCase(payload)),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Error updating project:", error.message);
    throw error;
  }
};

export const getProjectConfiguration = async () => {
  try {
    const response = await fetch(`${API_BASE}/projects/fetchConfigurations`);

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Error fetching project configuration:", error.message);
    throw error;
  }
};

export const fetchUserAccessForEdit = async () => {
  try {
    const response = await fetch(`${API_BASE}/projects/update/fetchUserAccess`);

    switch (response.status) {
      case 403:
        throw new Error("Error: Access Denied");
      case 204:
        return true;
      default:
        throw new Error("Error: Something went wrong");
    }
  } catch (error: any) {
    console.error("Error fetching project configuration:", error.message);
    throw error;
  }
};