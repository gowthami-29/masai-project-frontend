import { useState } from "react"
import { addExpense } from "../services/expenseService"

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
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default function ExpenseForm({ fetchExpenses, expenses, budgets }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    tags: "",
    note: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const categoryBudget = budgets.find(
      (b) => b.category === form.category
    )

    if (categoryBudget) {
      const totalCategoryExpense = expenses
        .filter((e) => e.category === form.category)
        .reduce((sum, e) => sum + Number(e.amount), 0)

      const newTotal = totalCategoryExpense + Number(form.amount)

      if (newTotal > categoryBudget.amount) {
        alert(`Budget exceeded! Limit is ₹${categoryBudget.amount}`)
        return
      }
    }

    await addExpense({
      ...form,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim())
        : [],
    })

    fetchExpenses()

    setForm({
      title: "",
      amount: "",
      category: "",
      tags: "",
      note: "",
    })
  }

  return (
    <Card className="max-w-xl mx-auto shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle>Add Expense 💸</CardTitle>
        <CardDescription>
          Record a new expense and track your spending
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="Enter expense title"
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

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <Input
              placeholder="Comma separated (e.g. friends, trip)"
              value={form.tags}
              onChange={(e) =>
                setForm({ ...form, tags: e.target.value })
              }
            />
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label>Note</Label>
            <Textarea
              placeholder="Optional note about this expense"
              value={form.note}
              onChange={(e) =>
                setForm({ ...form, note: e.target.value })
              }
            />
          </div>

          <Button type="submit" className="w-full">
            Add Expense
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}