import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ChangePasswordFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePassFormProps {
  onCancel: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const ChangePassForm: React.FC<ChangePassFormProps> = ({
  onCancel,
  updatePassword,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormInputs>();

  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<ChangePasswordFormInputs> = async (data) => {
    await updatePassword(data.currentPassword, data.newPassword);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Password</h3>
      <div className="form-group">
        <label>Current Password</label>
        <input
          type="password"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
        />
        {errors.currentPassword && (
          <span className="error">{errors.currentPassword.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.newPassword && (
          <span className="error">{errors.newPassword.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Confirm New Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
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

export default ChangePassForm;
