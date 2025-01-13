import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface EmailFormInputs {
  email: string;
}

interface ChangeEmailFormProps {
  onCancel: () => void;
  updateEmail: (email: string) => Promise<void>;
}

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({
  onCancel,
  updateEmail,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormInputs>();

  const onSubmit: SubmitHandler<EmailFormInputs> = async (data) => {
    await updateEmail(data.email);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Email</h3>
      <div className="form-group">
        <label>New Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
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

export default ChangeEmailForm;
