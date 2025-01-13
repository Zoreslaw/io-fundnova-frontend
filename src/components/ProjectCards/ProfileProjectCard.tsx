import React from "react";
import BaseProjectCard from "./BaseProjectCard";
import "./ProfileProjectCard.css";

interface Project {
  id: string;
  title: string;
  url: string;
}

interface ProfileProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProfileProjectCard: React.FC<ProfileProjectCardProps> = ({
  project,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="clickable-profile-card">
      <BaseProjectCard
        project={{
            id: project.id,
            title: project.title,
            url: project.url,
        }}
        className="profile-project-card"
        paddingContentStyle={{padding: "0 20px", height: "50%"}}
        fontSizeContentStyle={{fontSize: "15px"}}
        />
    </div>
  );
};

export default ProfileProjectCard;
