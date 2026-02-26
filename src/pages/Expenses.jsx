import { useEffect,useState } from "react";
import { getExpenses } from "../services/expenseService";
import ExpenseFilter from "../components/ExpenseFilter";
import { filterExpense } from "../services/expenseService";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import {  useNavigate } from "react-router-dom";
import { getBudget } from "../services/budgetService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
export default function Expenses(){
    const [expenses,setExpenses]=useState([]);
    const [budgets,setBudgets]=useState([])
    const fetchExpenses=async()=>{
        const res=await getExpenses();
        setExpenses(res.data);
        console.log(res.data);
        
    };
    const fetchBudgets=async()=>{
        const res=await getBudget();
        setBudgets(res.data)
    }
    const navigate=useNavigate()
    const handleSplit=(expense)=>{
        console.log("clocked id:",expense);
        
        navigate(`/split/${expense.id}`,{
            state:expense
        }
        )
    }
    useEffect(()=>{
        fetchExpenses(),
        fetchBudgets()
    },[]);
    const handleFilter=async(filters)=>{
        try {
            if(!filters.category && !filters.tags){
                fetchExpenses();
                return
            }
            const res=await filterExpense(filters)
            setExpenses(res.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
  <div className="min-h-screen  bg-accent p-8">
    
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Expenses 💸
          </h1>
          <p className="text-muted-foreground">
            Track, filter, and manage your expenses
          </p>
        </div>

        <Button onClick={() => navigate("/summary")}>
          View Summary
        </Button>
      </div>

      {/* Filter Card */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Filter Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseFilter onFilter={handleFilter} />
        </CardContent>
      </Card>

      {/* Add Expense Card */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Add Expense</CardTitle>
          <CardDescription>
            Record a new expense and assign it to a budget
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseForm
            fetchExpenses={fetchExpenses}
            expenses={expenses}
            budgets={budgets}
          />
        </CardContent>
      </Card>

      {/* Expense List Card */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
          <CardDescription>
            View and manage all your expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseList
            expenses={expenses}
            fetchExpenses={fetchExpenses}
            onSplit={handleSplit}
          />
        </CardContent>
      </Card>

    </div>
  </div>
)
}