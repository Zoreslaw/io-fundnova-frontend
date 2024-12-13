// import { useState } from "react";
// import { LoginPayload } from "../types/LoginPayload";
// import { login, register } from "../utils/authApi";

// export const useAuth = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const loginUser = async (LoginPayload: LoginPayload) => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const data = await login(LoginPayload);
//       // TODO: Dodać przechowywanie danych w sesji
//       console.log("Login successful:", data);
//     } catch (err: any) {
//       setError(err.response?.data?.message || ("Login failed: " + err) );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const registerUser = async (username:string, email: string, password: string) => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const data = await register(username, email, password);
//       console.log("Registration successful:", data);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { loginUser, registerUser, isLoading, error };
// };
