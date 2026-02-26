import { useState } from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
export default function ExpenseFilter({ onFilter }) {
  const [category, setCategory] = useState("")
  const [tag, setTag] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    onFilter({
      category,
      tag,
    })
  }

  const handleReset = () => {
    setCategory("")
    setTag("")
    onFilter({})
  }

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Filter Expenses 🔍</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Tag */}
          <div className="space-y-2">
            <Label>Tag</Label>
            <Input
              placeholder="Enter tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 md:col-span-2">
            <Button type="submit">
              Search
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}