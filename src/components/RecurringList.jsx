import { useEffect, useState } from "react"
import {
  getRecurring,
  deleteRecurring,
  updateRecurring,
} from "../services/recurringService"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
function RecurringList({ refreshFlag }) {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const res = await getRecurring()
    setData(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [refreshFlag])

  const remove = async (id) => {
    await deleteRecurring(id)
    fetchData()
  }

  const updateItem = async (id) => {
    const title = prompt("New Title:")
    if (!title) return
    await updateRecurring(id, { title })
    fetchData()
  }

  if (data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No recurring payments added yet 🔁
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {data.map((item) => (
        <Card
          key={item.id}
          className="shadow-lg rounded-2xl hover:shadow-xl transition"
        >
          <CardContent className="p-6 flex justify-between items-center">

            {/* Left Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {item.title}
              </h3>

              <p className="text-green-600 font-bold">
                ₹{item.amount}
              </p>

              <div className="flex gap-2 items-center">
                <Badge variant="secondary">
                  {item.frequency}
                </Badge>

                <span className="text-sm text-muted-foreground">
                  Starts: {item.start_date}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => updateItem(item.id)}
              >
                Update
              </Button>

              <Button
                variant="destructive"
                onClick={() => remove(item.id)}
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

export default RecurringList