//import axios from "axios";
import { LoginPayload } from "../types/LoginPayload";
import { UpdateResponse } from "../types/AuthResponses";

const API_BASE = "https://localhost:7225/api";

export const login = async (LoginPayload: LoginPayload) => {
  try{
    const myRequest = new Request(`${API_BASE}/Auth/login`, {
        method: "POST",
        body: JSON.stringify(LoginPayload),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const response = await fetch(myRequest);

    // Check if the response is not successful
    if (!response.ok) {
        // Attempt to extract and return error details if provided by the server
        const errorResponse = await response.json();
        throw new Error(
            errorResponse.message || `Response status: ${response.status}`
        );
    }

    // Parse the response JSON
    const data = await response.json();
    return data; // Return the data to the caller
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw error; // Propagate the error to the caller
  }
};

export const updateUsernameApi = async (newUsername: string): Promise<UpdateResponse> => {
  try {
    const response = await fetch(`${API_BASE}/user/update-username`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `Response status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Возвращаем данные при успешном выполнении
  } catch (error: any) {
    console.error("Update username error:", error.message);
    throw error; // Прокидываем ошибку наверх
  }
};

export const updateEmailApi = async (newEmail: string): Promise<UpdateResponse> => {
  try {
    const response = await fetch(`${API_BASE}/user/update-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `Response status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Возвращаем данные при успешном выполнении
  } catch (error: any) {
    console.error("Update email error:", error.message);
    throw error; // Прокидываем ошибку наверх
  }
};

export const updatePasswordApi = async (currentPassword: string, newPassword: string) => {
  try {
    const response = await fetch(`${API_BASE}/Auth/update-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `Response status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Возвращаем данные при успешном выполнении
  } catch (error: any) {
    console.error("Update password error:", error.message);
    throw error; // Прокидываем ошибку наверх
  }
};

export const register = async (username: string, email: string, password: string) => {
    try{
      const response = await fetch(`${API_BASE}/Auth/register`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, email: email, password: password })
      });
  
      // Check if the response is not successful
      if (!response.ok) {
          // Attempt to extract and return error details if provided by the server
          const errorResponse = await response.json();
          throw new Error(
              errorResponse.message || `Response status: ${response.status}`
          );
      }
  
      // Parse the response JSON
      const data = await response.json();
      return data; // Return the data to the caller
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw error; // Propagate the error to the caller
    }
};
