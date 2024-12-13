import React, { useState } from "react";
import SettingsTab from "./Tabs/SettingsTab";
import GeneralInfoTab from "./Tabs/GeneralInfoTab";
import AdvancedInfoTab from "./Tabs/AdvancedInfoTab";
import BackedProjectsTab from "./Tabs/BackedProjectsTab";
import MyProjectsTab from "./Tabs/MyProjectsTab";

const UserProfile: React.FC = () => {

    const [activeTab, setActiveTab] = useState("general");

    const submenuHandler = (submenuID :string) => {
        setActiveTab(submenuID);

    };

    const renderTabContent = () => {
        switch (activeTab) {
            default:
                return <GeneralInfoTab />
            case "general": 
                return <GeneralInfoTab />
            case "advanced": 
                return <AdvancedInfoTab />
            case "backed": 
                return <BackedProjectsTab />
            case "myProjects": 
                return <MyProjectsTab />
            case "settings": 
                return <SettingsTab />
        }
    };

    return (
        <div className="profilePage">
            <section className="profileMenuCategories">
                <div className="profileCategoryList">
                    <button className="profileCategory" type="button" onClick={() => {submenuHandler("general")}}>InfoIcon</button>
                    <button className="profileCategory" type="button" onClick={() => {submenuHandler("advanced")}}>AdvcIcon</button>
                    <button className="profileCategory" type="button" onClick={() => {submenuHandler("backed")}}>ProjIcon</button>
                    <button className="profileCategory" type="button" onClick={() => {submenuHandler("myProjects")}}>FundIcon</button>
                    <button className="profileCategory" type="button" onClick={() => {submenuHandler("settings")}}>PrefIcon</button>
                </div>
            </section>

            <section className="profileContent">
                <div className="tabContent">
                    {renderTabContent()}
                </div>
            </section>
        </div>
    )
}

export default UserProfile;