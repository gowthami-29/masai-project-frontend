import { useState } from "react"
import Confetti from "react-confetti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Trash2 } from "lucide-react"

export default function SavingsGoals() {
  const [goals, setGoals] = useState([])
  const [form, setForm] = useState({
    title: "",
    targetAmount: "",
    savedAmount: "",
  })
  const [celebrate, setCelebrate] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const triggerCelebration = () => {
    setCelebrate(true)
    setTimeout(() => setCelebrate(false), 4000)
  }

  const handleAddGoal = (e) => {
    e.preventDefault()

    const newGoal = {
      id: Date.now(),
      title: form.title,
      targetAmount: Number(form.targetAmount),
      savedAmount: Number(form.savedAmount),
    }

    setGoals([...goals, newGoal])

    if (newGoal.savedAmount >= newGoal.targetAmount) {
      triggerCelebration()
    }

    setForm({ title: "", targetAmount: "", savedAmount: "" })
  }

  const handleDelete = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  return (
    <div className="p-10 space-y-8 bg-accent relative">
      {celebrate && <Confetti />}

      <h1 className="text-3xl font-bold text-center">
        🎯 Savings Goals Tracker
      </h1>

      {/* Add Goal Form */}
      <Card className="max-w-xl mx-auto shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <Input
              name="title"
              placeholder="Goal Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="targetAmount"
              placeholder="Target Amount"
              value={form.targetAmount}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              name="savedAmount"
              placeholder="Saved Amount"
              value={form.savedAmount}
              onChange={handleChange}
              required
            />
            <Button className="w-full">Add Goal</Button>
          </form>
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress =
            (goal.savedAmount / goal.targetAmount) * 100

          const completed =
            goal.savedAmount >= goal.targetAmount

          return (
            <Card
              key={goal.id}
              className={`shadow-md rounded-2xl ${
                completed ? "bg-green-50 border-green-400" : ""
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {goal.title}
                  {completed && " 🎉"}
                </CardTitle>

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(goal.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </CardHeader>

              <CardContent className="space-y-3">
                <p>Target: ₹{goal.targetAmount}</p>
                <p>Saved: ₹{goal.savedAmount}</p>
                <p>
                  Remaining: ₹
                  {Math.max(
                    goal.targetAmount - goal.savedAmount,
                    0
                  )}
                </p>

                <Progress
                  value={Math.min(progress, 100)}
                />
                <p className="text-sm text-muted-foreground">
                  {Math.min(progress, 100).toFixed(1)}% Completed
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}