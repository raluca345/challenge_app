import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Page Not Found</p>
      <Link to="/" className="btn btn-primary">
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
