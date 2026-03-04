import axios from "axios"
const getToken=()=>localStorage.getItem("token")
const API="https://fintrack-api-wn7l.onrender.com/api/ai/insights"
export const getAIInsight= async(data)=> axios.post(API,data,{headers:{Authorization: `Bearer ${getToken()}`}})


