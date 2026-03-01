import { useState } from "react"
import { addIncome } from "../services/incomeService"

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
import { toast } from "sonner"

function IncomeForm({ refresh }) {
  const [form, setForm] = useState({
    amount: "",
    source: "",
    description: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addIncome(form)
    toast.success("Income added successfully 💰")
    refresh()

    setForm({
      amount: "",
      source: "",
      description: "",
    })
  }

  return (
    <Card className="max-w-xl mx-auto shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle>Add Income 💰</CardTitle>
        <CardDescription>
          Record a new income source
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

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

          {/* Source */}
          <div className="space-y-2">
            <Label>Source</Label>
            <Select
              value={form.source}
              onValueChange={(value) =>
                setForm({ ...form, source: value })
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
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Optional description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <Button type="submit" className="w-full">
            Add Income
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}

export default IncomeForm