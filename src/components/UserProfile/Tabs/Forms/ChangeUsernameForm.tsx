import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../../contexts/AuthContext";

interface UsernameFormInputs {
  username: string;
}

const ChangeUsernameForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { updateUsername, isLoading, error, serverErrorClear } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameFormInputs>();

  const onSubmit: SubmitHandler<UsernameFormInputs> = async (data) => {
    console.log("Submitted data:", data);
  
    try {
      // Попытка обновить имя пользователя
      await updateUsername(data.username);
  
      // Если ошибок нет, закрываем форму
      onCancel();
    } catch (err) {
      // Ошибка будет обрабатываться внутри `updateUsername` и прокидывается сюда
      console.error("Error updating username:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Username</h3>


      <div className="form-group">
        <label>New Username</label>
        <input
          type="text"
          {...register("username", {
            required: "Please enter a username",
            minLength: { value: 3, message: "Username must be at least 3 characters long" },
          })}
          onChange={(e) => {
            register("username").onChange(e);
            serverErrorClear();
          }}
        />
        {error && <div className="error">{"Failed to update username"}</div>}
        {errors.username && <span className="error">{errors.username.message}</span>}
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

export default ChangeUsernameForm;
