import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ExpenseChart({ summary }) {
  if (!summary || !summary.categoryBreakdown) {
    return (
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6 text-center text-muted-foreground">
          No expense data available 📭
        </CardContent>
      </Card>
    )
  }

  const labels = Object.keys(summary.categoryBreakdown)
  const values = Object.values(summary.categoryBreakdown).map((v) =>
    Number(v)
  )

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: values,
        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#06b6d4",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Card className="shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle>Expense Breakdown 📊</CardTitle>
        <CardDescription>
          Category-wise distribution of expenses
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center items-center">
        <div className="w-[300px] h-[300px]">
          <Pie
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}