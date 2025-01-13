import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../../contexts/AuthContext";

interface UsernameFormInputs {
  username: string;
}

interface ChangeUsernameFormProps {
  onCancel: () => void;
  updateUsername: (username: string) => Promise<void>;
}

const ChangeUsernameForm: React.FC<ChangeUsernameFormProps> = ({
  onCancel,
  updateUsername,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UsernameFormInputs>();

  const onSubmit: SubmitHandler<UsernameFormInputs> = async (data) => {
    await updateUsername(data.username);
    
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Username</h3>
      <div className="form-group">
        <label>New Username</label>
        <input
          type="text"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
        />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>
      <div className="formActions">
        <button type="button" onClick={onCancel} className="cancelButton">
          Cancel
        </button>
        <button type="submit" className="confirmButton" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Confirm"}
        </button>
      </div>
    </form>
  );
};

export default ChangeUsernameForm;
