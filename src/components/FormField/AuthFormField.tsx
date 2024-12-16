import React from "react";
import { useEffect } from "react";

interface AuthFormFieldProps {
  label: string;
  name: string;
  type: string;
  error?: string;
  register: any;
  validation?: any;
}

const AuthFormField: React.FC<AuthFormFieldProps> = ({ label, name, type, error, register, validation }) => {

    return(
      <div className="form-group">
        <label>{label}</label>
        <input type={type} {...register(name, validation)} />
        {error && <span className="error">{error}</span>}
      </div>
    );
}


export default AuthFormField;
