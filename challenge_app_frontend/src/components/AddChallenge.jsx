import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addChallenge } from "../utils/ChallengeBackend";

function AddChallenge() {
  const [formValues, setFormValues] = useState({
    month: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { month, description } = formValues;

    try {
      await addChallenge({ description }, month);
      setFormValues({ month: "", description: "" });
      navigate("/challenges");
    } catch (error) {
      console.error("Failed to add challenge:", error);
    }
  };

  const handleCancel = () => {
    navigate("/challenges");
  };

  return (
    <div className="card mt-5 text-start">
      <div className="card-header text-bg-success">Add New Challenge</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="month" className="form-label">
              Month
            </label>
            <select
              className="form-control"
              name="month"
              value={formValues.month}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a month
              </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              placeholder="Description"
              value={formValues.description}
              onChange={handleChange}
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
          <button type="submit" className="btn-success btn">
            Add Challenge
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddChallenge;
