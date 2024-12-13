import React from "react";
import { useEffect } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  error?: string;
  register: any;
  validation?: any;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type, error, register, validation }) => {

    console.log("error");

    return(
      <div className="form-group">
        <label>{label}</label>
        <input type={type} {...register(name, validation)} />
        {error && <span className="error">{error}</span>}
      </div>
    );
}


export default FormField;
