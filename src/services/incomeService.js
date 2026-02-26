import axios from "axios";

const API = 
"https://fintrack-api-wn7l.onrender.com/api/income";

const getToken = () => localStorage.getItem("token")?.trim()

// ADD
export const addIncome = (data) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// GET
export const getIncome = () =>
  axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// UPDATE
export const updateIncome = (id, data) =>
  axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// DELETE
export const deleteIncome = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });