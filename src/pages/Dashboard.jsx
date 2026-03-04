import { useEffect, useState } from "react"
import ExpenseChart from "../components/ExpenseChart"
import { getExpensesSummary } from "../services/summariService"
import { getAIInsight} from "../services/aiService"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    categoryBreakdown: {},
  })
  const [aiAdvice,setAiAdvice]=useState("")

  const fetchSummary = async () => {
    try {
      const res = await getExpensesSummary()
      setSummary(res.data)
      const aiData={
        income:res.data.totalIncome,
        expenses:res.data.totalExpense,
        categories:Object.keys(res.data.categoryBreakdown).join(", ")
      }
      const aiRes=await getAIInsight(aiData)
      console.log(aiRes);
      
      setAiAdvice(aiRes.insights)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])
  

  const balance =
    (summary.totalIncome || 0) - (summary.totalExpense || 0)

  return (
    <div className="min-h-screen bg-accent p-8">
      
      <div className="max-w-7xl  mx-auto space-y-8">

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold  text-center tracking-tight">
            Dashboard Overview 📊
          </h1>
          <p className="text-muted-foreground text-center mt-1">
            Monitor your financial performance in one place
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">

          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                ₹{summary.totalIncome || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Expense
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-500">
                ₹{summary.totalExpense || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={`text-2xl font-bold ${
                  balance >= 0 ? "text-blue-600" : "text-red-600"
                }`}
              >
                ₹{balance}
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Chart Section */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>
              Category-wise expense distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ExpenseChart summary={summary} />
          </CardContent>
        </Card>
        {/*ai */}
        <Card className="shadow-xl rounded-2xl mt-6">
  <CardHeader>
    <CardTitle>AI Financial Advisor 🤖</CardTitle>
  </CardHeader>

  <CardContent>
    <p className="text-sm whitespace-pre-line">
      {aiAdvice || "Generating insights..."}
    </p>
  </CardContent>
</Card>

      </div>
    </div>
  )
}