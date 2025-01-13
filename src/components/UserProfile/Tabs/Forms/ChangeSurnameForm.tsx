import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface SurnameFormInputs {
  surname: string;
}

const ChangeSurnameForm: React.FC<{ onCancel: () => void; updateSurname: (surname: string) => void }> = ({
  onCancel,
  updateSurname,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SurnameFormInputs>();

  const onSubmit: SubmitHandler<SurnameFormInputs> = async (data) => {
    await updateSurname(data.surname);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Surname</h3>
      <div className="form-group">
        <label>New Surname</label>
        <input
          type="text"
          {...register("surname", {
            required: "Surname is required",
            minLength: { value: 2, message: "Surname must be at least 2 characters" },
          })}
        />
        {errors.surname && <span className="error">{errors.surname.message}</span>}
      </div>
      <div className="formActions">
        <button type="button" onClick={onCancel} className="cancelButton">
          Cancel
        </button>
        <button type="submit" className="confirmButton">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default ChangeSurnameForm;
