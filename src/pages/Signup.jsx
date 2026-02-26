"use client"
import { signupUser } from "@/services/authService"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors,setErrors]=useState({})
const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
  let newErrors = {}

  if (!form.name.trim()) {
    newErrors.name = "Name is required"
  }

  if (!form.email) {
    newErrors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Invalid email format"
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
    setLoading(true)
    try {
      const response=await signupUser(form)
     console.log(response.data);
     
      navigate("/login")
      
      
    } catch (error) {
      console.log(error);
     setErrors({api:"signup failed. Try again."})
      
    }finally{
      setLoading(false)
    }

    // Simulate API call
    setTimeout(() => {
      console.log(form)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 px-4">
      
      <Card className="w-full max-w-md shadow-2xl rounded-2xl backdrop-blur-sm">
        
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create Account 🚀
          </CardTitle>
          <CardDescription>
            Start managing your finances today
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
              {errors.name && (
  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
)}
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
)}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-sm text-muted-foreground"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.api && (
  <p className="text-red-500 text-sm text-center">{errors.api}</p>
)}

            {/* Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>

      </Card>
    </div>
  )
}