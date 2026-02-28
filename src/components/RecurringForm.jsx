import { useState } from "react"
import { addRecurring } from "../services/recurringService"

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
function RecurringForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    frequency: "monthly",
    start_date: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addRecurring(form)
    toast.success("Recurring payment added")
    refresh()

    setForm({
      title: "",
      amount: "",
      category: "",
      frequency: "monthly",
      start_date: "",
    })
  }

  return (
    <Card className="max-w-xl mx-auto shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle>Add Recurring Payment 🔁</CardTitle>
        <CardDescription>
          Schedule automatic recurring expenses
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Netflix Subscription"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              placeholder="Entertainment / Bills"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select
              value={form.frequency}
              onValueChange={(value) =>
                setForm({ ...form, frequency: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              type="date"
              value={form.start_date}
              onChange={(e) =>
                setForm({ ...form, start_date: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add Recurring
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}

export default RecurringForm