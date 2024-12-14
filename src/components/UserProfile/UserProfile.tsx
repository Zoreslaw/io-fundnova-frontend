import React, { useState } from "react";
import SettingsTab from "./Tabs/SettingsTab";
import GeneralInfoTab from "./Tabs/GeneralInfoTab";
import AdvancedInfoTab from "./Tabs/AdvancedInfoTab";
import BackedProjectsTab from "./Tabs/BackedProjectsTab";
import MyProjectsTab from "./Tabs/MyProjectsTab";
import {
    InformationCircleIcon,
    CogIcon,
    CurrencyDollarIcon,
    BriefcaseIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import "./UserProfile.css";

interface Tab {
  id: string;
  label: string;
  icon: JSX.Element;
}

const tabs: Tab[] = [
  { id: "general", label: "General Info", icon: <InformationCircleIcon className="icon" /> },
  { id: "advanced", label: "Advanced Info", icon: <CogIcon className="icon" /> },
  { id: "backed", label: "Backed Projects", icon: <CurrencyDollarIcon className="icon" /> },
  { id: "myProjects", label: "My Projects", icon: <BriefcaseIcon className="icon" /> },
  { id: "settings", label: "Settings", icon: <AdjustmentsHorizontalIcon className="icon" /> },
];

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderTabContent = () => {
    switch (activeTab) {
      case "advanced":
        return <AdvancedInfoTab />;
      case "backed":
        return <BackedProjectsTab />;
      case "myProjects":
        return <MyProjectsTab />;
      case "settings":
        return <SettingsTab />;
      case "general":
      default:
        return <GeneralInfoTab />;
    }
  };

  return (
    <div className="profilePage">
      <section className="profileMenuCategories">
        <div className="profileCategoryList">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`profileCategory ${activeTab === tab.id ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
            </button>
          ))}
        </div>
      </section>

      <section className="profileContent">
        <div className="tabContent">{renderTabContent()}</div>
      </section>
    </div>
  );
};

export default UserProfile;
