import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import AuthFormField from "../FormField/AuthFormField";
import "./Auth.css";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {

  const [firstClick, setFirstClick] = useState(false);

  const { registerUser, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const buttonHandler = () => {
    setFirstClick(true);
  }


  const password = watch("password");

  useEffect(() => {

    if(firstClick){
      trigger("confirmPassword");
    }
    
  }, [password, trigger, firstClick])
  

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    registerUser(data.username, data.email, data.password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}

      <AuthFormField
        label="Username"
        name="username"
        type="username"
        register={register}
        error={errors.username?.message}
        validation={{ 
          required: "Please enter your username",
          pattern: {value: /[A-Za-z]\w+/, message: "Invalid username"},
          minLength: {value: 3, message: "Too short username"},
          maxLength: {value: 20, message: "Too long username"}
        }}
      />

      <AuthFormField
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
        validation={{ 
        required: "Please enter your email",
        pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email"}, 
      }}
      />

      <AuthFormField
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
        validation={{
          required: "Please enter your password",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        }}
      />

      <AuthFormField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword?.message}
        validation={{
          required: "Please confirm your password",
          validate: (value: string) => value === password || "Passwords do not match",
        }}
      />

      <button type="submit" className="btn" disabled={isLoading} onClick={buttonHandler}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
