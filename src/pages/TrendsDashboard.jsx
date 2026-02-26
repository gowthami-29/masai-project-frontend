import { useEffect,useState } from "react";
import {getExpenses} from "../services/expenseService"
import {Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer, LineChart} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
export default function TrendsDashboard() {
  const [monthlyData, setMonthlyData] = useState([])

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    const res = await getExpenses()
    processMonthlyData(res.data)
  }

  const processMonthlyData = (data) => {
    const grouped = {}

    data.forEach((item) => {
      const month = new Date(item.created_at).toLocaleString("default", {
        month: "short",
      })

      if (!grouped[month]) {
        grouped[month] = 0
      }

      grouped[month] += Number(item.amount)
    })

    const formatted = Object.keys(grouped).map((month) => ({
      month,
      total: grouped[month],
    }))

    setMonthlyData(formatted)
  }

  return (
    <div className="min-h-screen bg-accent p-8">
      
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Spending Trends Dashboard 📈
          </h2>
          <p className="text-muted-foreground text-center mt-1">
            Analyze your monthly spending patterns
          </p>
        </div>

        {/* Chart Card */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
            <CardDescription>
              Total expenses grouped by month
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}