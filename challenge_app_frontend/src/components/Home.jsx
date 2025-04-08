import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Welcome to the Challenge App</h1>
      <p className="lead">Challenge yourself!</p>
      <div className="mt-4">
        <Link to="/challenges" className="btn btn-primary">
          View Challenges
        </Link>
      </div>
    </div>
  );
}

export default Home;
