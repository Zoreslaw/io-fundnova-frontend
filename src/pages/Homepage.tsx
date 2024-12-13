import React from "react";
import "./Homepage.css";
import ProjectCard from "../components/ProjectCards/ProjectCard";
import { useProjects } from "../hooks/useProjects";
//import { useAuth } from "../Contexts/AuthContext";

const Homepage: React.FC = () => {
  const { projects, isLoading, error } = useProjects();
  
//  const { user } = useAuth();

  // const exploreButtonHandler = () => {
  //   alert("User: " + user?.username + " Email: " + user?.email)
  // }

  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to Our Crowdfunding Platform</h1>
        <p>Discover and support innovative projects that shape the future.</p>
        
        <button className="btn btn-primary"
        //onClick={exploreButtonHandler}
        >
          Explore Projects
        </button>
      </section>

      <section className="categories">
        <h2>Categories</h2>
        <div className="category-list">
          <div className="category-card">Technology</div>
          <div className="category-card">Art</div>
          <div className="category-card">Science</div>
          <div className="category-card">Health</div>
        </div>
      </section>

      <section className="projects">
        <h2>Recent Projects</h2>
        {isLoading && <p>Loading projects...</p>}
        {error && <p>Error loading projects: {error}</p>}
        {!isLoading && !error && projects.length > 0 ? (
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        ) : (
          !isLoading && <p>No projects found.</p>
        )}
      </section>
    </div>
  );
};

export default Homepage;
