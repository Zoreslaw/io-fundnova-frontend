import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { user, errorClear } = useAuth();

  useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }; 
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      errorClear();
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

  return (
    <div
      className={`modal-overlay ${isClosing ? "closing" : ""}`}
      // onClick={(e) => {
      //   if (e.target === e.currentTarget) {
      //     handleClose();
      //   }
      // }}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
