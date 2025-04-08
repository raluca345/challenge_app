import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChallengeById, updateChallenge } from "../utils/ChallengeBackend";

export default function UpdateChallenge() {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({ description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challenge = await fetchChallengeById(id);
        setFormValues({ description: challenge.description });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch challenge:", err);
        setError("Failed to load challenge details.");
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateChallenge(id, formValues);
      navigate("/challenges");
    } catch (err) {
      console.error("Failed to update challenge:", err);
      setError("Failed to update challenge.");
    }
  };

  const handleCancel = () => {
    navigate("/challenges");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card mt-5 text-start">
      <div className="card-header text-bg-success">Update Challenge</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Update the challenge description"
              value={formValues.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-success me-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Update Challenge
          </button>
        </form>
      </div>
    </div>
  );
}
