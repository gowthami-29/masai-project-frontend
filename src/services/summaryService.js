import axios from "axios"
const API="http://localhost:3000/api/expenses"

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