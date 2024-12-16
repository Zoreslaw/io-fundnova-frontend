import React, { useState, useEffect } from "react";
import "./SettingsTab.css";

const SettingsTab: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const savedNotificationsState = localStorage.getItem("notificationsEnabled");
    if (savedNotificationsState === "true") {
      setNotificationsEnabled(true);
    }

    setIsContentVisible(true);
  }, []);

  const handleCookiesToggle = () => {
    if (!cookiesEnabled) {
      const userResponse = window.confirm("Do you want to enable cookies?");
      if (userResponse) {
        setCookiesEnabled(true);
      }
    } else {
      setCookiesEnabled(false);
    }
  };

  const handleNotificationChange = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      localStorage.setItem("notificationsEnabled", "false");
      return;
    }

    const currentPermission = Notification.permission;

    if (currentPermission === "granted") {
      setNotificationsEnabled(true);
      localStorage.setItem("notificationsEnabled", "true");
      showTestNotification();
    } else if (currentPermission === "default") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotificationsEnabled(true);
        localStorage.setItem("notificationsEnabled", "true");
        showTestNotification();
      } else {
        alert("You have denied notifications. Please enable them in browser settings.");
      }
    } else if (currentPermission === "denied") {
      alert("Notifications are blocked. Please enable them in browser settings.");
    }
  };

  const showTestNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Test Notification", {
        body: "Notifications are enabled.",
      });
    }
  };

  return (
    <div className="settings-tab">
      <div className={`infoContentWrapper ${isContentVisible ? "fade-in" : "fade-out"}`}>
        <h3>Settings</h3>
        <ul className="settings-list">
          <li className="settings-item" onClick={handleNotificationChange}>
            <span className="settings-label">Enable Notifications</span>
            <div
              className={`switch ${notificationsEnabled ? "active" : ""}`}
              aria-checked={notificationsEnabled}
            ></div>
          </li>
          <li className="settings-item" onClick={handleCookiesToggle}>
            <span className="settings-label">Enable Cookies</span>
            <div className={`switch ${cookiesEnabled ? "active" : ""}`}></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsTab;
