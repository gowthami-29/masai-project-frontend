import { useState } from "react"
import { addBudget } from "../services/budgetService"

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
function BudgetForm({ refresh }) {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    month: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addBudget(form)
    toast.success("Budget created sucessfully")
    refresh()
    setForm({ category: "", amount: "", month: "" })
  }

  return (
    <Card className="max-w-md mx-auto shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle>Add Budget 💰</CardTitle>
        <CardDescription>
          Set a monthly spending limit for a category
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(value) =>
                setForm({ ...form, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="bills">Bills</SelectItem>
                <SelectItem value="entertainment">
                  Entertainment
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="Enter Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
              required
            />
          </div>

          {/* Month */}
          <div className="space-y-2">
            <Label>Month</Label>
            <Input
              type="month"
              value={form.month}
              onChange={(e) =>
                setForm({ ...form, month: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add Budget
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}

export default BudgetForm