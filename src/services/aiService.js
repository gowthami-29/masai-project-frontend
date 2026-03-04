import axios from "axios"
const getToken=()=>localStorage.getItem("token")
const API="https://fintrack-api-wn7l.onrender.com/api/ai"
export const getAIInsights= async(data)=> axios.post(API,data,{headers:{Authorization: `Bearer ${getToken()}`}})


