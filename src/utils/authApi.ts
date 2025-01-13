import { LoginPayload } from "../types/LoginPayload";
import { convertToPascalCase, convertToCamelCase } from "../utils/caseConverters";

const API_BASE = "https://localhost:7225/api";

export const login = async (payload: LoginPayload) => {
  try {
    const response = await fetch(`${API_BASE}/Auth/login`, {
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
    console.error("Login error:", error.message);
    throw error;
  }
};

export const register = async (username: string, email: string, password: string) => {
  try {
    const payload = convertToPascalCase({ username, email, password });
    const response = await fetch(`${API_BASE}/Auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(errorResponse);
    }

    const data = await response.json();
    return convertToCamelCase(data);
  } catch (error: any) {
    console.error("Register error:", error.message);
    throw error;
  }
};
