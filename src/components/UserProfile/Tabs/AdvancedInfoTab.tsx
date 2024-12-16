import React, { useEffect, useState } from "react";
import "./GeneralInfoTab.css";
import ChangeNameForm from "./Forms/ChangeNameForm";
import ChangeSurnameForm from "./Forms/ChangeSurnameForm";
import ChangeAddressForm from "./Forms/ChangeAdressForm";
import ChangePaymentForm from "./Forms/ChangePaymentForm";
import ChangePaymentInfoForm from "./Forms/ChangePaymentInfoForm";
import { useAdvancedInfo } from "../../../hooks/useAdvancedInfo";
import { useAuth } from "../../../contexts/AuthContext";

const AdvancedInfoTab: React.FC = () => {
  const { user } = useAuth();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const { info, isLoading, error, updateName, updateSurname, updateAddress, updatePayment, updatePaymentInfo } =
    useAdvancedInfo(user!);

  useEffect(() => {
    if (!isLoading) {
      setIsContentVisible(true)
    } else {
      setIsContentVisible(false);
    }
  }, [isLoading]);

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

  return (
    <div className="advancedInfoTab">
      {/* {isLoading && <p>Loading advanced info...</p>} */}

      {error && <p className="error">{error}</p>}

      <div className={`infoContentWrapper ${isContentVisible ? "fade-in" : "fade-out"}`}>
        <h3 style={{ marginTop: "0px" }}>Advanced Info</h3>
        <ul className="infoList">
          <li className="infoItem" onClick={() => 
            activeField ? handleChangeEdit("name") : handleOpenEdit("name")
            }>
            <div className="infoContent">
              <span className="infoLabel">Name:</span>
              <span className="infoValue">{info?.name || "Not provided"}</span>
            </div>
            <i className="material-icons editIcon" title="Edit name">edit</i>
          </li>

          <li className="infoItem" onClick={() => 
            activeField ? handleChangeEdit("surname") : handleOpenEdit("surname")
            }>
            <div className="infoContent">
              <span className="infoLabel">Surname:</span>
              <span className="infoValue">{info?.surname || "Not provided"}</span>
            </div>
            <i className="material-icons editIcon" title="Edit surname">edit</i>
          </li>

          <li className="infoItem" onClick={() => 
            activeField ? handleChangeEdit("address") : handleOpenEdit("address")
            }>
            <div className="infoContent">
              <span className="infoLabel">Address:</span>
              <span className="infoValue">{info?.address || "Not provided"}</span>
            </div>
            <i className="material-icons editIcon" title="Edit address">edit</i>
          </li>

          <li className="infoItem" onClick={() => 
            activeField ? handleChangeEdit("payment") : handleOpenEdit("payment")
            }>
            <div className="infoContent">
              <span className="infoLabel">Payment Method:</span>
              <span className="infoValue">{info?.paymentMethod || "Not provided"}</span>
            </div>
            <i className="material-icons editIcon" title="Edit payment method">edit</i>
          </li>

          <li className="infoItem" onClick={() => 
            activeField ? handleChangeEdit("paymentInfo") : handleOpenEdit("paymentInfo")
            }>
            <div className="infoContent">
              <span className="infoLabel">Payment Info:</span>
              <span className="infoValue">{info?.paymentInfo || "Not provided"}</span>
            </div>
            <i className="material-icons editIcon" title="Edit payment info">edit</i>
          </li>
        </ul>

        <div
          className={`editForm ${activeField ? "visible" : ""} ${
            isTransitioning ? "transitioning" : ""
          }`}
        >
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AdvancedInfoTab;
