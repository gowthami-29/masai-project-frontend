
import { useEffect, useState } from "react"
import { getIncome, deleteIncome, updateIncome } from "../services/incomeService"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
function IncomeList({ refreshKey }) {
  const [incomes, setIncomes] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    amount: "",
    source: "",
    description: "",
  })

  useEffect(() => {
    fetchIncome()
  }, [refreshKey])

  const fetchIncome = async () => {
    try {
      const res = await getIncome()
      setIncomes(res.data.data || res.data)
    } catch (err) {
      console.log("Fetch error:", err)
    }
  }

  const handleDelete = async (id) => {
    await deleteIncome(id)
    fetchIncome()
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setEditData(item)
  }

  const handleUpdate = async () => {
    await updateIncome(editId, editData)
    setEditId(null)
    fetchIncome()
  }

  return (
    <div className="space-y-6">

      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Income List 💵
        </h3>
      </div>

      {incomes.length === 0 && (
        <p className="text-center text-muted-foreground">
          No income added yet 📭
        </p>
      )}

      {incomes.map((item) => (
        <Card
          key={item.id}
          className="shadow-lg rounded-2xl hover:shadow-xl transition"
        >
          <CardContent className="p-6 space-y-4">

            {editId === item.id ? (
              <div className="space-y-4">

                <Input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: e.target.value })
                  }
                />

                <Select
                  value={editData.source}
                  onValueChange={(value) =>
                    setEditData({ ...editData, source: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Source" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Salary">Salary</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
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
              <div className="flex justify-between items-center">

                {/* Left */}
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-green-600">
                    ₹{item.amount}
                  </p>

                  <Badge variant="secondary">
                    {item.source}
                  </Badge>

                  {item.description && (
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Right */}
                <div className="flex gap-3">
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

export default IncomeList