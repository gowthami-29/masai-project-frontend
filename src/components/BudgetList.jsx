
import { useEffect, useState } from "react"
import { getBudget, deleteBudget, updateBudget } from "../services/budgetService"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
function BudgetList({ refreshKey }) {
  const [budgets, setBudgets] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    category: "",
    amount: "",
    month: "",
  })

  useEffect(() => {
    fetchBudgets()
  }, [refreshKey])

  const fetchBudgets = async () => {
    const res = await getBudget()
    setBudgets(res.data.data || res.data)
  }

  const handleDelete = async (id) => {
    await deleteBudget(id)
    fetchBudgets()
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setEditData(item)
  }

  const handleUpdate = async () => {
    await updateBudget(editId, editData)
    setEditId(null)
    fetchBudgets()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Budget List 📋
        </h3>
      </div>

      {budgets.map((item) => (
        <Card key={item.id} className="shadow-lg rounded-2xl">
          <CardContent className="p-6 space-y-4">

            {editId === item.id ? (
              <div className="space-y-4">

                <Input
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                />

                <Input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: e.target.value })
                  }
                />

                <Input
                  type="month"
                  value={editData.month}
                  onChange={(e) =>
                    setEditData({ ...editData, month: e.target.value })
                  }
                />

                <div className="flex gap-3">
                  <Button onClick={handleUpdate}>
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </Button>
                </div>

              </div>
            ) : (
              <div className="space-y-3">

                <div className="flex justify-between items-center">
                  <Badge variant="secondary">
                    {item.category}
                  </Badge>

                  <span className="font-semibold text-green-600">
                    ₹{item.amount}
                  </span>
                </div>

                <p className="text-muted-foreground">
                  Month: {item.month}
                </p>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </div>

              </div>
            )}

          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default BudgetList