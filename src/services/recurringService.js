import axios from "axios";

const API = "https://fintrack-api-wn7l.onrender.com";

const getToken = () => localStorage.getItem("token");

// ADD
export const addRecurring = (data) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// GET
export const getRecurring = () =>
  axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// UPDATE
export const updateRecurring = (id, data) =>
  axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// DELETE
export const deleteRecurring = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });