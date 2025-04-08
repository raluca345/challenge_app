import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddChallenge from "./components/AddChallenge";
import UpdateChallenge from "./components/UpdateChallenge";
import ChallengeList from "./components/ChallengeList";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container text-center mb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/challenge/add" element={<AddChallenge />} />
            <Route path="/challenge/update/:id" element={<UpdateChallenge />} />
            <Route path="/challenges" element={<ChallengeList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
