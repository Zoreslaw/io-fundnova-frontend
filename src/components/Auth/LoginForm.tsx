import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../Contexts/AuthContext";
import { LoginPayload } from "../../types/LoginPayload";
import FormField from "../FormField/FormField";
import "./Auth.css";
import { login } from "../../utils/authApi";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {

  const { loginUser, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const loginPayload: LoginPayload = emailPattern.test(data.username)
      ? { email: data.username, password: data.password }
      : { username: data.username, password: data.password };

    loginUser(loginPayload);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}

      <FormField
        label="Username / Email"
        name="username"
        type="username"
        register={register}
        error={errors.username?.message}
        validation={{ 
          required: "Please enter your username or email",
        }}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
        validation={{
          required: "Please enter your password",
        }}
      />

      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
