import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface PaymentFormInputs {
  paymentMethod: string;
}

const ChangePaymentForm: React.FC<{ onCancel: () => void; updatePayment: (method: string) => void }> = ({
  onCancel,
  updatePayment,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>();

  const onSubmit: SubmitHandler<PaymentFormInputs> = async (data) => {
    await updatePayment(data.paymentMethod);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Payment Method</h3>
      <div className="form-group">
        <label>New Payment Method</label>
        <input
          type="text"
          {...register("paymentMethod", {
            required: "Payment Method is required",
            minLength: { value: 3, message: "Payment Method must be at least 3 characters" },
          })}
        />
        {errors.paymentMethod && <span className="error">{errors.paymentMethod.message}</span>}
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

export default ChangePaymentForm;
