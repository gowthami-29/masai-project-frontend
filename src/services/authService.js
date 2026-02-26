import axios from "axios"
const API="https://fintrack-api-wn7l.onrender.com"

export const signupUser= async(userData)=>{
    return axios.post(`${API}/signup`,userData)
}
export const loginUser=async(userData)=>{
    return axios.post(`${API}/login`,userData)
};