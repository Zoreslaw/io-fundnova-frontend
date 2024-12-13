import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="notfound">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      {/* <Link to="/" className="btn btn-primary">
        Go Back to Homepage
      </Link> */}
    </div>
  );
};

export default NotFound;
