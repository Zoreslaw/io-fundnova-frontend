import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../Contexts/AuthContext"; 
import Modal from "../Modal/Modal";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import Logo from "../Logo/Logo";
import "./Header.css";

const Header: React.FC = () => {
  const { user, logout } = useAuth(); // Dekonstrukcja `user` i `logout`
  const loginModal = useModal();
  const registerModal = useModal();

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <header className="header">
      <div className="header-logo">
      <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="auth-buttons">
        {user ? (
          <>
            <span>Welcome, {user.username}!</span>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={loginModal.openModal}>Log In</button>
            <button onClick={registerModal.openModal}>Sign Up</button>
          </>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={loginModal.isOpen} onClose={loginModal.closeModal}>
        <LoginForm />
      </Modal>
      <Modal isOpen={registerModal.isOpen} onClose={registerModal.closeModal}>
        <RegisterForm />
      </Modal>
    </header>
  );
};

export default Header;
