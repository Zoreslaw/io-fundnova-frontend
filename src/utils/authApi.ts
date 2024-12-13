//import axios from "axios";
import { LoginPayload } from "../types/LoginPayload";

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

export const register = async (username: string, email: string, password: string) => {
    try{
      const response = await fetch(`${API_BASE}/Auth/register`,{
          method: "POST",
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
