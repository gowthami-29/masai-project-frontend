import axios from "axios"
const API="http://localhost:3000/api/expenses"

const getToken=()=>localStorage.getItem("token")
//add expense
export const addExpense =(data)=>axios.post(API,data,{headers:{Authorization: `Bearer ${getToken()}`}});
//get all
export const getExpenses=()=>axios.get(API,{headers:{Authorization:`Bearer ${getToken()}`}});
//delete expense
export const deleteExpense=(id)=>axios.delete(`${API}/${id}`,{headers:{Authorization: `Bearer ${getToken()}`}})


//filter
export const filterExpense=(filters)=>axios.get(`${API}/filter`,{params:filters,
    headers:{
        Authorization:`Bearer ${getToken()}`
    }
})