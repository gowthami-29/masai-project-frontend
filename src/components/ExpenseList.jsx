import { deleteExpense } from "../services/expenseService"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
export default function ExpenseList({
  expenses,
  fetchExpenses,
  onSplit,
}) {
  const handleDelete = async (id) => {
    await deleteExpense(id)
    fetchExpenses()
  }

  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No expenses found 📭
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {expenses.map((item) => (
        <Card
          key={item.id}
          className="shadow-lg rounded-2xl hover:shadow-xl transition"
        >
          <CardContent className="p-6 flex justify-between items-center">

            {/* Left Side */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {item.title}
              </h3>

              <p className="text-green-600 font-bold">
                ₹{item.amount}
              </p>

              <Badge variant="secondary">
                {item.category}
              </Badge>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onSplit(item)}
              >
                Split
              </Button>

              <Button
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  )
}