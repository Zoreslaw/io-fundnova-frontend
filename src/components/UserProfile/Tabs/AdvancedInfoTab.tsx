import React, { useState } from "react";
import "./GeneralInfoTab.css"; // Используем существующий CSS для таба
import ChangeNameForm from "./Forms/ChangeNameForm";
import ChangeSurnameForm from "./Forms/ChangeSurnameForm";
import ChangeAddressForm from "./Forms/ChangeAdressForm";
import ChangePaymentForm from "./Forms/ChangePaymentForm";
import ChangePaymentInfoForm from "./Forms/ChangePaymentInfoForm";
import { useAdvancedInfo } from "../../../hooks/useAdvancedInfo";
import { useAuth } from "../../../contexts/AuthContext";

const AdvancedInfoTab: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading user information...</p>;
  }

  const [activeField, setActiveField] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { info, isLoading, error, updateName, updateSurname, updateAddress, updatePayment, updatePaymentInfo } =
  useAdvancedInfo(user);

  const handleOpenEdit = (field: string) => {
    if (activeField) return;
    setActiveField(field);
  };

  const handleChangeEdit = (field: string) => {
    if (activeField === field || !activeField) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveField(field);
      setIsTransitioning(false);
    }, 300);
  };

  const handleCancel = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveField(null);
      setIsTransitioning(false);
    }, 300);
  };

  const renderForm = () => {
    switch (activeField) {
      case "name":
        return <ChangeNameForm onCancel={handleCancel} updateName={updateName} />;
      case "surname":
        return <ChangeSurnameForm onCancel={handleCancel} updateSurname={updateSurname} />;
      case "address":
        return <ChangeAddressForm onCancel={handleCancel} updateAddress={updateAddress} />;
      case "payment":
        return <ChangePaymentForm onCancel={handleCancel} updatePayment={updatePayment} />;
      case "paymentInfo":
        return <ChangePaymentInfoForm onCancel={handleCancel} updatePaymentInfo={updatePaymentInfo} />;
      default:
        return null;
    }
  };

  if (isLoading) return <p>Loading advanced info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="generalInfoTab">
      <h3 style={{ marginTop: "0px" }}>Advanced Info</h3>
      <ul className="infoList">
        {/* Name Card */}
        <li
          className="infoItem"
          onClick={() =>
            activeField ? handleChangeEdit("name") : handleOpenEdit("name")
          }
        >
          <div className="infoContent">
            <span className="infoLabel">Name:</span>
            <span className="infoValue">{info?.name || "Not provided"}</span>
          </div>
          <span className="editIcon" title="Edit name">
            <i className="material-icons">edit</i>
          </span>
        </li>

        {/* Surname Card */}
        <li
          className="infoItem"
          onClick={() =>
            activeField ? handleChangeEdit("surname") : handleOpenEdit("surname")
          }
        >
          <div className="infoContent">
            <span className="infoLabel">Surname:</span>
            <span className="infoValue">{info?.surname || "Not provided"}</span>
          </div>
          <span className="editIcon" title="Edit surname">
            <i className="material-icons">edit</i>
          </span>
        </li>

        {/* Address Card */}
        <li
          className="infoItem"
          onClick={() =>
            activeField ? handleChangeEdit("address") : handleOpenEdit("address")
          }
        >
          <div className="infoContent">
            <span className="infoLabel">Address:</span>
            <span className="infoValue">{info?.address || "Not provided"}</span>
          </div>
          <span className="editIcon" title="Edit address">
            <i className="material-icons">edit</i>
          </span>
        </li>

        {/* Payment Method Card */}
        <li
          className="infoItem"
          onClick={() =>
            activeField ? handleChangeEdit("payment") : handleOpenEdit("payment")
          }
        >
          <div className="infoContent">
            <span className="infoLabel">Payment Method:</span>
            <span className="infoValue">{info?.paymentMethod || "Not provided"}</span>
          </div>
          <span className="editIcon" title="Edit payment method">
            <i className="material-icons">edit</i>
          </span>
        </li>

        {/* Payment Method Info Card */}
        <li
          className="infoItem"
          onClick={() =>
            activeField
              ? handleChangeEdit("paymentInfo")
              : handleOpenEdit("paymentInfo")
          }
        >
          <div className="infoContent">
            <span className="infoLabel">Payment Info:</span>
            <span className="infoValue">{info?.paymentInfo || "Not provided"}</span>
          </div>
          <span className="editIcon" title="Edit payment info">
            <i className="material-icons">edit</i>
          </span>
        </li>
      </ul>

      {/* Form Section */}
      <div
        className={`editForm ${
          activeField ? "visible" : ""
        } ${isTransitioning ? "transitioning" : ""}`}
      >
        {renderForm()}
      </div>
    </div>
  );
};

export default AdvancedInfoTab;
