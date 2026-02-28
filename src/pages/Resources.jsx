
import { useState, useEffect } from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
export default function Resources() {
  const tips = [
    "Pay yourself first. Save before you spend.",
    "Track every expense for at least 30 days.",
    "Avoid lifestyle inflation when income increases.",
    "Invest early to benefit from compounding.",
  ]

  const [dailyTip, setDailyTip] = useState("")
  const [amount, setAmount] = useState("")
  const [years, setYears] = useState("")
  const [result, setResult] = useState(null)

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)]
    setDailyTip(randomTip)
  }, [])

  const calculateInvestment = () => {
    const rate = 0.12
    const futureValue = amount * Math.pow(1 + rate, years)
    setResult(futureValue.toFixed(2))
  }

  return (
    <div className="min-h-screen bg-accent p-8">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-center tracking-tight">
            Financial Education Hub 📚
          </h1>
          <p className="text-muted-foreground text-center mt-1">
            Learn, calculate, and grow your financial knowledge
          </p>
        </div>

        {/* Daily Tip */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>💡 Daily Financial Tip</CardTitle>
            <CardDescription>
              Small habits lead to big financial success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {dailyTip}
            </p>
          </CardContent>
        </Card>

        {/* Video Section */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>🎥 Learn From Experts</CardTitle>
            <CardDescription>
              Watch curated financial education content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/4j2emMn7UaI"
                title="Finance Education"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Investment Calculator */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>🧮 Investment Calculator</CardTitle>
            <CardDescription>
              Estimate your future investment growth (12% annual return assumed)
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder="Investment Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
              <Button onClick={calculateInvestment}>
                Calculate
              </Button>
            </div>

            {result && (
              <div className="p-4 rounded-lg bg-green-50 border">
                <p className="font-semibold text-green-700">
                  Estimated Value: ₹{result}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Reading */}
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>📰 Recommended Reading</CardTitle>
            <CardDescription>
              Trusted financial resources
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <a
              href="https://www.investopedia.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Investopedia - Finance Concepts Explained
            </a>
            <br/>
            <a
              href="https://www.moneycontrol.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              MoneyControl - Market Updates
            </a>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}