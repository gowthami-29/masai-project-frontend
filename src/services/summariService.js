import axios from "axios";

const API="https://fintrack-api-wn7l.onrender.com";
const getToken=()=>localStorage.getItem("token")
export const getExpensesSummary=()=>{
    return axios.get(API,{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
}