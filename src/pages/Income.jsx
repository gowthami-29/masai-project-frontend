import { useState } from "react"
import IncomeForm from "../components/IncomeForm"
import IncomeList from "../components/IncomeList"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

function IncomePage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const refresh = () => setRefreshKey((prev) => prev + 1)

  return (
    <div className="min-h-screen bg-accent py-10 px-4">
      
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Income Management 💵
          </h2>
          <p className="text-muted-foreground">
            Track and manage your income sources efficiently
          </p>
        </div>

        {/* Add Income Card */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Add Income</CardTitle>
            <CardDescription>
              Record your salary or other income sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IncomeForm refresh={refresh} />
          </CardContent>
        </Card>

        {/* Income List Card */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Your Income Records</CardTitle>
            <CardDescription>
              View and manage all your income entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IncomeList refreshKey={refreshKey} />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default IncomePage