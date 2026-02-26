import axios from "axios";
const API="http://localhost:3000/api/budget"
const getToken=()=>localStorage.getItem("token")

//add
export const addBudget=(data)=>axios.post(API,data,{headers:{Authorization:`Bearer ${getToken()}`}})
export const getBudget=()=>axios.get(API,{headers:{Authorization:`Bearer ${getToken()}`}})
export const updateBudget=(id,data)=>axios.put(`${API}/${id}`,data,
    {headers:{Authorization:`Bearer ${getToken()}`}})
export const deleteBudget=(id)=>axios.delete(`${API}/${id}`,{headers:{Authorization:`Bearer ${getToken()}`}})