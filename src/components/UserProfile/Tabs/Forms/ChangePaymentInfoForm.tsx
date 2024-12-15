import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface PaymentInfoFormInputs {
  paymentInfo: string;
}

const ChangePaymentInfoForm: React.FC<{ onCancel: () => void; updatePaymentInfo: (info: string) => void }> = ({
  onCancel,
  updatePaymentInfo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInfoFormInputs>();

  const onSubmit: SubmitHandler<PaymentInfoFormInputs> = async (data) => {
    await updatePaymentInfo(data.paymentInfo);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Change Payment Info</h3>
      <div className="form-group">
        <label>New Payment Info</label>
        <textarea
          {...register("paymentInfo", {
            required: "Payment Info is required",
            minLength: { value: 10, message: "Payment Info must be at least 10 characters" },
          })}
        />
        {errors.paymentInfo && <span className="error">{errors.paymentInfo.message}</span>}
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

export default ChangePaymentInfoForm;
