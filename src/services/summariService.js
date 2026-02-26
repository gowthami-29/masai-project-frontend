import axios from "axios";

const API="http://localhost:3000/api/summary";
const getToken=()=>localStorage.getItem("token")
export const getExpensesSummary=()=>{
    return axios.get(API,{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }
    })
}