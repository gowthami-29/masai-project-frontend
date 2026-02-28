import { useState } from "react"
import { createSplit } from "../services/splitService"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SplitForm({ expenseId, refresh }) {
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createSplit({
      expense_id: expenseId,
      total_amount: Number(amount),
      split_type: "equal",
      participants: [{ name }],
    })
    toast.success("Split expense added sucessfully")

    setAmount("")
    setName("")
    refresh()
  }

  if (!expenseId) {
    return (
      <div className="text-center text-muted-foreground py-6">
        Select an expense first 💳
      </div>
    )
  }

  return (
    <Card className="max-w-xl mx-auto bg- shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle>Create Split 🧾</CardTitle>
        <CardDescription>
          Divide the expense among participants
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Total Amount */}
          <div className="space-y-2">
            <Label>Total Amount</Label>
            <Input
              type="number"
              placeholder="Enter total amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Participant Name */}
          <div className="space-y-2">
            <Label>Participant Name</Label>
            <Input
              placeholder="Enter participant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add Split
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}