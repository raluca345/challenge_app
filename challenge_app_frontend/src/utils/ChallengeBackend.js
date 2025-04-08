import axios from "axios";

export async function fetchChallenges() {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/challenges/all"
    );
    console.log("Fetched challenges:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
}

export async function fetchChallengeById(id) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/challenges/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching challenge by ID:", error);
    return null;
  }
}

export async function fetchChallengesByMonth(month) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/challenges?month=${encodeURIComponent(
        month
      )}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching challenges by month:", error);
    return null;
  }
}

export async function addChallenge(challenge, month) {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/challenges/${month}`,
      challenge
    );
    return response.data;
  } catch (error) {
    console.error("Error adding challenge:", error);
  }
}

export async function updateChallenge(id, updatedChallenge) {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/challenges/${id}`,
      updatedChallenge
    );
    return response.data;
  } catch (error) {
    console.error("Error updating challenge:", error);
  }
}

export async function deleteChallenge(id) {
  try {
    await axios.delete(`http://localhost:8080/api/v1/challenges/${id}`);
  } catch (error) {
    console.error("Error deleting challenge:", error);
  }
}

export function transformChallengesByMonth(data) {
  const transformed = {};
  data.forEach((monthData) => {
    transformed[monthData.month] = monthData.challenges;
  });
  return transformed;
}
