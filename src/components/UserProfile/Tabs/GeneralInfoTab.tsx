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
      case "password":
        return <ChangePassForm onCancel={handleCancel} />;
      case "email":
        return <ChangeEmailForm onCancel={handleCancel} />;
      default:
        return null;
    }
  };

  return (
    <div className="generalInfoTab">
      <ul className="infoList">
        <li
          className="infoItem"
          onClick={() =>
            activeField
              ? handleChangeEdit("username")
              : handleOpenEdit("username")
          }
        >
          <span className="infoLabel">Username:</span>
          <span className="infoValue">{user?.username}</span>
        </li>
        <li
          className="infoItem"
          onClick={() =>
            activeField
              ? handleChangeEdit("email")
              : handleOpenEdit("email")
          }
        >
          <span className="infoLabel">Email:</span>
          <span className="infoValue">{user?.email}</span>
        </li>
        <li
          className="infoItem"
          onClick={() =>
            activeField
              ? handleChangeEdit("password")
              : handleOpenEdit("password")
          }
        >
          <span className="infoLabel">Password:</span>
          <span className="infoValue">********</span>
          <button
            onClick={() =>
              activeField
                ? handleChangeEdit("password")
                : handleOpenEdit("password")
            }
            className="editButton"
          >
            Edit
          </button>
        </li>
      </ul>

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
