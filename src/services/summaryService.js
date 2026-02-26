import axios from "axios"
const API="https://fintrack-api-wn7l.onrender.com"

const getToken=()=>localStorage.getItem("token")

export const getExpenseSummary=()=>{
    return axios.get(`${API}/summary`,{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
};

export const getMonthlySummary=()=>{
    return axios.get(`${API}/monthly-summary`,{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
};