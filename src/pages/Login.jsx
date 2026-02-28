"use client"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { loginUser } from "@/services/authService"
import { toast } from "sonner"

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [errors,setErrors]=useState({})
const navigate=useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const validate = () => {
  let newErrors = {}

  if (!form.email) {
    newErrors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Email is invalid"
  }

  if (!form.password) {
    newErrors.password = "Password is required"
  } else if (form.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters"
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validate()) return

  try {
    const response = await loginUser(form)
    localStorage.setItem("token", response.data.token)
    toast.success("Login sucessfully")
    navigate("/dashboard")
  } catch (error) {

    setErrors({ api: "Invalid email or password" })
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome Back 👋
          </CardTitle>
          <CardDescription>
            Login to continue managing your finances
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
)}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
)}
            </div>
            {errors.api && (
  <p className="text-red-500 text-sm text-center">{errors.api}</p>
)}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}