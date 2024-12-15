import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface AddressFormInputs {
  address: string;
}

const ChangeAddressForm: React.FC<{ onCancel: () => void; updateAddress: (address: string) => void }> = ({
  onCancel,
  updateAddress,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormInputs>();

  const onSubmit: SubmitHandler<AddressFormInputs> = async (data) => {
    await updateAddress(data.address);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Address</h3>
      <div className="form-group">
        <label>New Address</label>
        <input
          type="text"
          {...register("address", {
            required: "Address is required",
            minLength: { value: 5, message: "Address must be at least 5 characters" },
          })}
        />
        {errors.address && <span className="error">{errors.address.message}</span>}
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

export default ChangeAddressForm;
