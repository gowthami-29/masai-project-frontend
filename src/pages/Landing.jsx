import { Link } from "react-router-dom"
import finance from "../assets/finance.jpg"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold tracking-tight">
          FinanceApp 💰
        </h1>

        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100">
              Signup
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-24 px-6">
        <h2 className="text-5xl font-bold mb-6 leading-tight">
          Personal Finance Manager
        </h2>

        <p className="text-lg text-blue-100 mb-8 max-w-2xl">
          Track expenses, manage budgets, analyze spending and take control of your money.
        </p>

        
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 px-6 mt-32 pb-20">

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle>📊 Expense Tracking</CardTitle>
            <CardDescription className="text-blue-100">
              Track every rupee you spend and stay in control.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle>💰 Budget Management</CardTitle>
            <CardDescription className="text-blue-100">
              Set budgets and avoid overspending easily.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle>📈 Smart Analytics</CardTitle>
            <CardDescription className="text-blue-100">
              Visualize your spending with powerful charts.
            </CardDescription>
          </CardHeader>
        </Card>

      </div>

    </div>
  )
}

export default Home