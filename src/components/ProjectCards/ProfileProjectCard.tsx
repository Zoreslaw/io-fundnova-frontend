import React from "react";
import BaseProjectCard from "./BaseProjectCard";
import "./ProfileProjectCard.css";

interface Project {
  id: string;
  title: string;
  URL: string;
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
            URL: project.URL,
        }}
        className="profile-project-card"
        paddingContentStyle={{padding: "0 20px"}}
        />
    </div>
  );
};

export default ProfileProjectCard;
