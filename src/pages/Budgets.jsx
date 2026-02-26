import { useState } from "react"
import BudgetForm from "../components/BudgetForm"
import BudgetList from "../components/BudgetList"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

function Budgets() {
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = () => setRefreshKey((prev) => prev + 1)

  return (
    <div className="min-h-screen bg-accent py-10 px-4">
      
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Budget Management 💰
          </h2>
          <p className="text-muted-foreground">
            Create and manage your monthly budgets efficiently
          </p>
        </div>

        {/* Budget Form Card */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Add New Budget</CardTitle>
            <CardDescription>
              Set your category and monthly spending limit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetForm refresh={refresh} />
          </CardContent>
        </Card>

        {/* Budget List Card */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Your Budgets</CardTitle>
            <CardDescription>
              Track and manage your existing budgets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetList refreshKey={refreshKey} />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Budgets