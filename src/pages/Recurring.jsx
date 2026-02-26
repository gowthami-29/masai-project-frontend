
import { useState } from "react"
import RecurringForm from "../components/RecurringForm"
import RecurringList from "../components/RecurringList"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

function Recurring() {
  const [refreshFlag, setRefreshFlag] = useState(0)

  const refresh = () => setRefreshFlag((prev) => prev + 1)

  return (
    <div className="min-h-screen bg-accent p-8">
      
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Recurring Payments 🔁
          </h2>
          <p className="text-muted-foreground">
            Manage subscriptions and automated recurring expenses
          </p>
        </div>

        {/* Add Recurring Payment */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Add Recurring Payment</CardTitle>
            <CardDescription>
              Schedule a recurring transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecurringForm refresh={refresh} />
          </CardContent>
        </Card>

        {/* Recurring List */}
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Your Recurring Payments</CardTitle>
            <CardDescription>
              View and manage your active recurring payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecurringList refreshFlag={refreshFlag} />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Recurring