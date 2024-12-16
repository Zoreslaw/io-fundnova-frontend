import { UpdateResponse } from "../types/AuthResponses";
import { convertToPascalCase, convertToCamelCase } from "../utils/caseConverters";

const API_BASE = "https://localhost:7225/api";

export const updateUsernameApi = async (userId: string, newUsername: string): Promise<UpdateResponse> => {
  try {
    const response = await fetch(`${API_BASE}/users/update-username`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertToPascalCase({ id: userId, username: newUsername })),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Update username error:", error.message);
    throw error;
  }
};

export const updateEmailApi = async (userId: string, newEmail: string): Promise<UpdateResponse> => {
  try {
    const response = await fetch(`${API_BASE}/users/update-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertToPascalCase({ id: userId, email: newEmail })),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Update email error:", error.message);
    throw error;
  }
};

export const updatePasswordApi = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<UpdateResponse> => {
  try {
    const response = await fetch(`${API_BASE}/users/update-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertToPascalCase({ id: userId, currentPassword, password: newPassword })),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Update password error:", error.message);
    throw error;
  }
};

export const fetchBasicInfo = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE}/users/basic-info`, {
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
    console.error("Fetch basic info error:", error.message);
    throw error;
  }
};
