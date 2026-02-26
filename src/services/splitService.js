import axios from "axios";

const API = "https://fintrack-api-wn7l.onrender.com/api/split";

// get token from localStorage (same like your other services)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// CREATE
export const createSplit = (data) =>
  axios.post(API, data, getAuthHeaders());

// GET
export const getSplits = () =>
  axios.get(API, getAuthHeaders());

// DELETE
export const deleteSplit = (id) =>
  axios.delete(`${API}/${id}`, getAuthHeaders());