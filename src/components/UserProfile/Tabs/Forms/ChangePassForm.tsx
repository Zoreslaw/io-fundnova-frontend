import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../../contexts/AuthContext";

interface PasswordFormInputs {
  currentPassword: string;
  newPassword: string;
}

const ChangePassForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { updatePassword, isLoading, error, serverErrorClear } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormInputs>();

  const onSubmit: SubmitHandler<PasswordFormInputs> = async (data) => {
    try {
      // Попытка обновить пароль
      await updatePassword(data.currentPassword, data.newPassword);

      // Закрываем форму только при отсутствии ошибок
      onCancel();
    } catch (err) {
      console.error("Error updating password:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Password</h3>

      <div className="form-group">
        <label>Current Password</label>
        <input
          type="password"
          {...register("currentPassword", {
            required: "Please enter your current password",
          })}
          onChange={(e) => {
            register("currentPassword").onChange(e);
            serverErrorClear();
          }}
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
            required: "Please enter a new password",
            minLength: { value: 6, message: "Password must be at least 6 characters long" },
          })}
          onChange={(e) => {
            register("newPassword").onChange(e);
            serverErrorClear();
          }}
        />
        {errors.newPassword && (
          <span className="error">{errors.newPassword.message}</span>
        )}
      </div>

      {error && <div className="error">{"Failed to update password"}</div>}

      <div className="formActions">
        <button type="button" onClick={onCancel} className="cancelButton">
          Cancel
        </button>
        <button type="submit" className="confirmButton" disabled={isLoading}>
          {isLoading ? "Updating..." : "Confirm"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassForm;
