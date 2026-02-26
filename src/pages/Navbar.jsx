
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo / App Name */}
        <Link to="/dashboard" className="text-xl font-bold tracking-tight">
          FinanceApp 💰
        </Link>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          
          <Link to="/dashboard">
            <Button variant="ghost">
              Dashboard
            </Button>
          </Link>

          <Link to="/expenses">
            <Button variant="ghost">
              Expenses
            </Button>
          </Link>

          <Link to="/budgets">
            <Button variant="ghost">
              Budgets
            </Button>
          </Link>

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </div>
      </div>
    </div>
  )
}