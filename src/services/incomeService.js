import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL
const API = `${BASE_URL}/api/income`

const getToken = () => localStorage.getItem("token")

export const addIncome = (data) =>
  axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

export const getIncome = () =>
  axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

export const updateIncome = (id, data) =>
  axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

export const deleteIncome = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })