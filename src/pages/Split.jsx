import { useLocation, useParams } from "react-router-dom"
import { useState } from "react"
import SplitForm from "../components/SplitForm"
import SplitList from "../components/SplitList"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
export default function SplitPage() {
  const { expenseId } = useParams()
  const location = useLocation()
  const expense = location.state || null

  const [refreshKey, setRefreshKey] = useState(0)
  const refresh = () => setRefreshKey((p) => p + 1)

  return (
    <div className="min-h-screen bg-accent py-10 px-4">
      
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Expense Split 💳
          </h2>
          <p className="text-muted-foreground">
            Divide the expense among participants
          </p>
        </div>

        {/* Expense Info Card */}
        {expense && (
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>{expense.title}</CardTitle>
              <CardDescription>
                Expense Details
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-4 items-center">
              <Badge variant="secondary">
                Category: {expense.category}
              </Badge>

              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Amount: ₹{expense.amount}
              </Badge>
            </CardContent>
          </Card>
        )}

        {/* Split Form */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Add Split</CardTitle>
            <CardDescription>
              Add participants and split amount
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SplitForm expenseId={expenseId} refresh={refresh} />
          </CardContent>
        </Card>

        {/* Split List */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Split Details</CardTitle>
            <CardDescription>
              View how the expense is divided
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SplitList
              refreshKey={refreshKey}
              expenseTitle={expense?.title}
              expenseCategory={expense?.category}
              expenseAmount={expense?.amount}
            />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}