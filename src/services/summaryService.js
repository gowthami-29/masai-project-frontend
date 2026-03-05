import axios from "axios"
const API="https://fintrack-api-wn7l.onrender.com/api/summary"

const getToken=()=>localStorage.getItem("token")

export const getExpenseSummary=()=>{
    return axios.get(`${API}`,{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
};

export const getMonthlySummary=()=>{
    return axios.get(`${API}`,{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
};