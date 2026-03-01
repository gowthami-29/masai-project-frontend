import { useEffect,useState } from "react";
import { getExpenseSummary, getMonthlySummary } from "../services/summaryService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
export default function ExpenseSummary(){
    const [summary,setSummary]=useState(null);
    const [monthly,setMonthly]=useState({});
    const fetchSummary=async()=>{
        try {
            const res=await getExpenseSummary();
            setSummary(res.data) 
        } catch (error) {
            console.log(error);
            
        }
    }
    const fetchMonthly=async()=>{
        try {
            const res=await getMonthlySummary()
            setMonthly(res.data)
        } catch (error) {
            console.log((error));
        }
    };
    useEffect(()=>{
        fetchSummary();
        fetchMonthly();
    },[]);
    return (
  <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-8">
    
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Expense Summary 📊
        </h1>
        <p className="text-muted-foreground mt-2">
          Overview of your total and categorized expenses
        </p>
      </div>

      {/* Total Expense Card */}
      {summary && (
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Total Expense</CardTitle>
            <CardDescription>
              Overall spending amount
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-3xl font-bold text-blue-600">
              ₹{summary.total}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Category Breakdown */}
      {summary && (
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>
              Expense distribution by category
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {Object.entries(summary.categorySummary).map(
              ([cat, amt]) => (
                <div
                  key={cat}
                  className="flex justify-between items-center p-3 rounded-lg border bg-muted/40"
                >
                  <span className="font-medium">{cat}</span>
                  <span className="font-semibold">
                    ₹{amt}
                  </span>
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}

      {/* Monthly Summary */}
      {monthly && Object.keys(monthly).length > 0 && (
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>
              Month-wise expense tracking
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {Object.entries(monthly).map(([month, amt]) => (
              <div
                key={month}
                className="flex justify-between items-center p-3 rounded-lg border bg-green-50"
              >
                <span className="font-medium">{month}</span>
                <span className="font-semibold text-green-700">
                  ₹{amt}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

    </div>
  </div>
)
}