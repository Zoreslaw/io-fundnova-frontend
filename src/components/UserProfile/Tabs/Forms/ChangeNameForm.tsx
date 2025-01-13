import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface NameFormInputs {
  name: string;
}

const ChangeNameForm: React.FC<{ onCancel: () => void; updateName: (name: string) => void }> = ({
  onCancel,
  updateName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormInputs>();

  const onSubmit: SubmitHandler<NameFormInputs> = async (data) => {
    await updateName(data.name);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Name</h3>
      <div className="form-group">
        <label>New Name</label>
        <input
          type="text"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
          })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
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

export default ChangeNameForm;
