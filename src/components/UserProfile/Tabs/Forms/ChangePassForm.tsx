import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../../contexts/AuthContext";

interface ChangePasswordFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { updatePassword, isLoading, error, serverErrorClear } = useAuth();
  const [firstClick, setFirstClick] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ChangePasswordFormInputs>();

  const newPassword = watch("newPassword");

  // Обработчик для первой валидации confirmPassword
  const buttonHandler = () => {
    setFirstClick(true);
  };

  // Триггер динамической валидации confirmPassword при изменении newPassword
  useEffect(() => {
    if (firstClick) {
      trigger("confirmPassword");
    }
  }, [newPassword, trigger, firstClick]);

  const onSubmit: SubmitHandler<ChangePasswordFormInputs> = async (data) => {
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
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
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

      <div className="form-group">
        <label>Confirm New Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
          onChange={(e) => {
            register("confirmPassword").onChange(e);
            serverErrorClear();
          }}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
      </div>

      {error && <div className="error">{"Failed to update password"}</div>}

      <div className="formActions">
        <button type="button" onClick={onCancel} className="cancelButton">
          Cancel
        </button>
        <button
          type="submit"
          className="confirmButton"
          disabled={isLoading}
          onClick={buttonHandler}
        >
          {isLoading ? "Updating..." : "Confirm"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassForm;
