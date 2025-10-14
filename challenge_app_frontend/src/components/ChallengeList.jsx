import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Challenge from "./Challenge";
import ConfirmationModal from "./ConfirmationModal";
import {
  fetchChallenges,
  fetchChallengesByMonth,
  deleteChallenge,
  transformChallengesByMonth,
  updateChallenge,
} from "../utils/ChallengeBackend";

function ChallengeList() {
  const [allChallenges, setAllChallenges] = useState({});
  const [filteredChallenges, setFilteredChallenges] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [filterCompleted, setFilterCompleted] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [challengeToDelete, setChallengeToDelete] = useState(null);
  const challengesPerPage = 3;
  const navigate = useNavigate();

  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const refreshChallenges = async () => {
    const data = await fetchChallenges();
    const groupedData = transformChallengesByMonth(data);
    setAllChallenges(groupedData);
    setFilteredChallenges(groupedData);
  };

  const handleDelete = async () => {
    try {
      await deleteChallenge(challengeToDelete);
      setShowModal(false);
      setChallengeToDelete(null);
      refreshChallenges();
    } catch (error) {
      console.error("Failed to delete challenge:", error);
    }
  };

  const handleUpdate = (challenge) => {
    navigate(`/challenge/update/${challenge.id}`, {
      state: { challenge },
    });
  };

  const handleMonthFilterChange = async (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    if (month === "All") {
      refreshChallenges();
    } else {
      const data = await fetchChallengesByMonth(month);
      const groupedData = transformChallengesByMonth(data);
      setFilteredChallenges(groupedData);
    }

    setCurrentPage(1);
  };

  useEffect(() => {
    refreshChallenges();
  }, []);

  const allFilteredChallenges = Object.entries(filteredChallenges)
    .filter(([month]) => selectedMonth === "All" || month === selectedMonth)
    .flatMap(([month, challenges]) =>
      challenges.map((challenge) => ({ ...challenge, month }))
    );

  const paginatedChallengesFlat = allFilteredChallenges.slice(
    (currentPage - 1) * challengesPerPage,
    currentPage * challengesPerPage
  );

  const paginatedChallenges = paginatedChallengesFlat.reduce(
    (acc, challenge) => {
      if (!acc[challenge.month]) acc[challenge.month] = [];
      acc[challenge.month].push(challenge);
      return acc;
    },
    {}
  );

  const totalPages = Math.ceil(
    Object.values(filteredChallenges)
      .flat()
      .filter(
        (challenge) =>
          selectedMonth === "All" || challenge.month === selectedMonth
      ).length / challengesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggleCompleted = async (challenge) => {
    const updatedChallenge = {
      ...challenge,
      completed: !challenge.completed,
    };
    try {
      await updateChallenge(challenge.id, updatedChallenge);
      refreshChallenges();
    } catch (error) {
      console.error("Failed to update challenge:", error);
    }
  };

  const confirmDelete = (id) => {
    setChallengeToDelete(id);
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setChallengeToDelete(null);
  };

  const handleCompletionStatusChange = (event) => {
    const status = event.target.value;
    if (status === "All") {
      setFilterCompleted(null);
      setFilteredChallenges(allChallenges);
    } else {
      const isCompleted = status === "Complete";
      setFilterCompleted(isCompleted);

      const filtered = Object.entries(allChallenges).reduce(
        (acc, [month, challenges]) => {
          acc[month] = challenges.filter(
            (challenge) => challenge.completed === isCompleted
          );
          return acc;
        },
        {}
      );
      setFilteredChallenges(filtered);
    }

    setCurrentPage(1);
  };

  return (
    <div className="container mt-3 pt-4">
      <div className="d-flex justify-content-between align-items-start">
        <Link to="/challenge/add">
          <button className="btn btn-primary">Add Challenge</button>
        </Link>
        <div className="d-flex gap-2">
          <select
            className="form-select w-auto"
            value={selectedMonth}
            onChange={handleMonthFilterChange}
          >
            <option value="All">All Months</option>
            {monthOrder.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            className="form-select w-auto"
            value={
              filterCompleted === null
                ? "All"
                : filterCompleted
                ? "Complete"
                : "Incomplete"
            }
            onChange={handleCompletionStatusChange}
          >
            <option value="All">All Challenges</option>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          {Object.entries(paginatedChallenges).map(([month, challenges]) => (
            <div key={month} className="mb-4">
              <h3 className="d-flex justify-content-between align-items-start">
                {month}
              </h3>
              <ul className="list-group">
                {challenges.map((challenge) => (
                  <li
                    key={challenge.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div
                      className={
                        challenge.completed
                          ? "challenge-completed"
                          : "challenge-incomplete"
                      }
                    >
                      <Challenge challenge={challenge} />
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={challenge.completed}
                        onChange={() => handleToggleCompleted(challenge)}
                        title="Mark as completed"
                      />
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleUpdate(challenge)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => confirmDelete(challenge.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ConfirmationModal
        show={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this challenge?"
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default ChallengeList;
