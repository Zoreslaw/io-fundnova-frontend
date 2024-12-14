import React, { useState } from "react";
import "./GeneralInfoTab.css";
import { useAuth } from "../../../contexts/AuthContext";
import ChangeUsernameForm from "./Forms/ChangeUsernameForm";
import ChangePassForm from "./Forms/ChangePassForm";
import ChangeEmailForm from "./Forms/ChangeEmailForm";

const GeneralInfoTab: React.FC = () => {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { user, serverErrorClear } = useAuth();

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
      serverErrorClear();
    }, 300);
  };

  const handleCancel = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveField(null);
      setIsTransitioning(false);
      serverErrorClear();
    }, 300);
  };

  const renderForm = () => {
    switch (activeField) {
      case "username":
        return <ChangeUsernameForm onCancel={handleCancel} />;
      case "email":
        return <ChangeEmailForm onCancel={handleCancel} />;
      case "password":
        return <ChangePassForm onCancel={handleCancel} />;
      default:
        return null;
    }
  };

  return (
    <div className="generalInfoTab">
      <h3 style={{marginTop: "0px"}}>User Information</h3>
      <ul className="infoList">
        {/* Username Card */}
        <li
          className="infoItem"
          onClick={() =>
            activeField
              ? handleChangeEdit("username")
              : handleOpenEdit("username")
          }
        >
          <div className="infoContent">
            <span className="infoLabel">Username:</span>
            <span className="infoValue">{user?.username}</span>
          </div>
          <span className="editIcon" title="Edit username">
            <i className="material-icons">edit</i>
          </span>
        </li>

        {/* Email Card */}
        <li
          className="infoItem"
          onClick={() =>
            activeField
              ? handleChangeEdit("email")
              : handleOpenEdit("email")
          }
        >
          <div className="infoContent">
            <span className="infoLabel">Email:</span>
            <span className="infoValue">{user?.email}</span>
          </div>
          <span className="editIcon" title="Edit email">
            <i className="material-icons">edit</i>
          </span>
        </li>

        {/* Password Card */}
        <li
          className="infoItem"
          onClick={() =>
            activeField
              ? handleChangeEdit("password")
              : handleOpenEdit("password")
          }
        >
          <div className="infoContent">
            <span className="infoLabel">Password:</span>
            <span className="infoValue">
              {Array.from({ length: user?.passwordLength || 0 })
              .map(() => '*')
              .join('')}
            </span>
          </div>
          <span className="editIcon" title="Edit password">
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

export default GeneralInfoTab;
