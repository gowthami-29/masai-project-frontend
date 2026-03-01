import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Wallet, PiggyBank, BarChart3,  } from "lucide-react"

function Home() {
  const { user } = useContext(AuthContext)

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-700 via-purple-700 to-blue-800 text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6 backdrop-blur-md bg-white/5">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Wallet className="h-6 w-6 text-yellow-300" />
          FinanceApp
        </h1>

        <div className="space-x-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  Login
                </Button>
              </Link>

              
            </>
          ) : (
            <Link to="/dashboard">
              <Button className="bg-white text-indigo-700">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-24 px-6">
        <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-4xl">
          Take Full Control of Your Personal Finances
        </h2>

        <p className="text-lg text-blue-100 max-w-2xl mb-8">
          Track expenses, manage budgets, visualize trends, and make smarter financial decisions effortlessly.
        </p>

        <Link to={user ? "/dashboard" : "/signup"}>
          <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-200 px-8 py-6 text-lg">
            {user ? "Go to Dashboard" : "Get Started 🚀"}
          </Button>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center gap-16 mt-20 text-center">
        <div>
          <h3 className="text-3xl font-bold">10K+</h3>
          <p className="text-blue-200">Transactions Tracked</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">95%</h3>
          <p className="text-blue-200">Budget Accuracy</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold">Secure</h3>
          <p className="text-blue-200">Data Protection</p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 px-6 mt-24 pb-20">

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white rounded-2xl shadow-xl hover:scale-105 transition duration-300">
          <CardHeader className="flex items-center gap-3">
            <Wallet className="h-6 w-6 text-yellow-300" />
            <CardTitle>Expense Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-blue-100">
              Monitor every expense and understand where your money goes.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white rounded-2xl shadow-xl hover:scale-105 transition duration-300">
          <CardHeader className="flex items-center gap-3">
            <PiggyBank className="h-6 w-6 text-green-300" />
            <CardTitle>Budget Management</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-blue-100">
              Set smart budgets and prevent overspending before it happens.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white rounded-2xl shadow-xl hover:scale-105 transition duration-300">
          <CardHeader className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-pink-300" />
            <CardTitle>Smart Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-blue-100">
              Visual dashboards and reports to make informed financial decisions.
            </CardDescription>
          </CardContent>
        </Card>

      </div>

      {/* Footer */}
      <div className="text-center py-6 bg-white/5 backdrop-blur-md">
        <p className="text-blue-200">
          © 2026 FinanceApp. Built with React & Tailwind.
        </p>
      </div>

    </div>
  )
}

export default Home