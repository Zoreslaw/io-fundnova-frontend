import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserProfile from "../UserProfile/UserProfile";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { user, serverErrorClear, userId } = useAuth();

  // console.log(children);

  useEffect(() => {
    if (userId) {
      handleClose();
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add("no-scroll");
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleKeyDown);
    }; 
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      serverErrorClear();
      onClose();
    }, 500);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  const isUserProfile = children && React.isValidElement(children) && children.type === UserProfile;

  return (
    <div
      className={`modal-overlay ${isClosing ? "closing" : ""}`}
      // onClick={(e) => {
      //   if (e.target === e.currentTarget) {
      //     handleClose();
      //   }
      // }}
    >
      {}
      <div className="modal-content"
      style={{
        width: isUserProfile ? "85vw" : "500px",
        // maxWidth: isUserProfile ? "90%" : "500px",
        background: isUserProfile ? "none" : "#333333",
        padding: isUserProfile ? "none" : "20px",
      }}
      
      >
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
