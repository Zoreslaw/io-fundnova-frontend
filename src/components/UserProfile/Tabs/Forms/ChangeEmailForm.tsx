import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../../contexts/AuthContext";

interface EmailFormInputs {
  email: string;
}

const ChangeEmailForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { updateEmail, isLoading, error, serverErrorClear } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormInputs>();

  const onSubmit: SubmitHandler<EmailFormInputs> = async (data) => {
    try {
      // Попытка обновить email
      await updateEmail(data.email);

      // Закрываем форму только при отсутствии ошибок
      onCancel();
    } catch (err) {
      console.error("Error updating email:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Email</h3>

      <div className="form-group">
        <label>New Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Please enter an email",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          onChange={(e) => {
            register("email").onChange(e);
            serverErrorClear();
          }}
        />
        {error && <div className="error">{"Failed to update email"}</div>}
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

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

export default ChangeEmailForm;
