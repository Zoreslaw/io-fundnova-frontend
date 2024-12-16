import React, { useEffect, useState } from "react";
import "./GeneralInfoTab.css";
import ChangeUsernameForm from "./Forms/ChangeUsernameForm";
import ChangePassForm from "./Forms/ChangePassForm";
import ChangeEmailForm from "./Forms/ChangeEmailForm";
import { useBasicInfo } from "../../../hooks/useBasicInfo";
import { useAuth } from "../../../contexts/AuthContext";

const GeneralInfoTab: React.FC = () => {
  const { user } = useAuth();
  const { info, isLoading, error, clearError, updateUsername, updateEmail, updatePassword } = useBasicInfo(user!);

  const [activeField, setActiveField] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsContentVisible(true);
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
      // clearError();
    }, 300);
  };

  const handleCancel = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveField(null);
      setIsTransitioning(false);
      // clearError();
    }, 300);
  };

  const renderForm = () => {
    switch (activeField) {
      case "username":
        return <ChangeUsernameForm onCancel={handleCancel} updateUsername={updateUsername} />;
      case "email":
        return <ChangeEmailForm onCancel={handleCancel} updateEmail={updateEmail} />;
      case "password":
        return <ChangePassForm onCancel={handleCancel} updatePassword={updatePassword} />;
      default:
        return null;
    }
  };

  return (
    <div className="generalInfoTab">
      <div className={`infoContentWrapper ${isContentVisible ? "fade-in" : "fade-out"}`}>
        <h3 style={{ marginTop: "0px" }}>User Information</h3>
        <ul className="infoList">
          {/* Username Card */}
          <li
            className="infoItem"
            onClick={() =>
              activeField ? handleChangeEdit("username") : handleOpenEdit("username")
            }
          >
            <div className="infoContent">
              <span className="infoLabel">Username:</span>
              <span className="infoValue">{info?.username || "Not provided"}</span>
            </div>
            <span className="editIcon" title="Edit username">
              <i className="material-icons">edit</i>
            </span>
          </li>

          <li
            className="infoItem"
            onClick={() =>
              activeField ? handleChangeEdit("email") : handleOpenEdit("email")
            }
          >
            <div className="infoContent">
              <span className="infoLabel">Email:</span>
              <span className="infoValue">{info?.email || "Not provided"}</span>
            </div>
            <span className="editIcon" title="Edit email">
              <i className="material-icons">edit</i>
            </span>
          </li>

          <li
            className="infoItem"
            onClick={() =>
              activeField ? handleChangeEdit("password") : handleOpenEdit("password")
            }
          >
            <div className="infoContent">
              <span className="infoLabel">Password:</span>
              <span className="infoValue">
                {Array.from({ length: info?.passwordLength || 0 })
                  .map(() => "*")
                  .join("")}
              </span>
            </div>
            <span className="editIcon" title="Edit password">
              <i className="material-icons">edit</i>
            </span>
          </li>
        </ul>

        {error && <p className="error">{error}</p>}

        <div
          className={`editForm ${
            activeField ? "visible" : ""
          } ${isTransitioning ? "transitioning" : ""}`}
        >
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoTab;
