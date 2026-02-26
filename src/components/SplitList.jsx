
import { useEffect, useState } from "react"
import { getSplits, deleteSplit } from "../services/splitService"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
export default function SplitList({
  refreshKey,
  expenseTitle,
  expenseCategory,
  expenseAmount,
}) {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const res = await getSplits()
    setData(res.data.message || res.data)
  }

  useEffect(() => {
    fetchData()
  }, [refreshKey])

  const remove = async (id) => {
    await deleteSplit(id)
    fetchData()
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No splits added yet 🧾
      </div>
    )
  }

  return (
    <div className="space-y-6 ">

      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle>All Splits 👥</CardTitle>
          <CardDescription>
            Breakdown of the selected expense
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {data.map((item) => (
            <Card
              key={item.id}
              className="shadow-md rounded-xl hover:shadow-lg transition"
            >
              <CardContent className="p-5 flex justify-between items-center">

                {/* Left Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">
                    {expenseTitle}
                  </h4>

                  <div className="flex gap-2 items-center">
                    <Badge variant="secondary">
                      {expenseCategory}
                    </Badge>

                    <span className="text-sm text-muted-foreground">
                      Total: ₹{expenseAmount}
                    </span>
                  </div>

                  <p className="text-sm">
                    Participant:{" "}
                    <span className="font-medium">
                      {item.participants?.[0]?.name}
                    </span>
                  </p>

                  <p className="text-purple-600 font-bold text-lg">
                    Split Amount: ₹{item.total_amount}
                  </p>
                </div>

                {/* Right Section */}
                <Button
                  variant="destructive"
                  onClick={() => remove(item.id)}
                >
                  Delete
                </Button>

              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

    </div>
  )
}