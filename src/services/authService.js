import axios from "axios"
const API="http://localhost:3000/api"

export const signupUser= async(userData)=>{
    return axios.post(`${API}/signup`,userData)
}
export const loginUser=async(userData)=>{
    return axios.post(`${API}/login`,userData)
};