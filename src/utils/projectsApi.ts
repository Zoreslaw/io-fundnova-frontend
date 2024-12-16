import { convertToPascalCase, convertToCamelCase } from "../utils/caseConverters";

const API_BASE = "https://localhost:7225/api";

export const getBackedProjects = async (userId: string) => {
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

export const getMyProjects = async (userId: string) => {
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
