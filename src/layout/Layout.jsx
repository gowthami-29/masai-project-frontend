import {  useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/pages/ThemeToggle"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Repeat,
  PiggyBank,
  TrendingUp,
  BookOpen,
  LogOut,
  Menu,
  Target,
  
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out successfully 👋")
    navigate("/login")
  }

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Income", path: "/income", icon: Wallet },
    { name: "Expenses", path: "/expenses", icon: Receipt },
    { name: "Recurring", path: "/recurring", icon: Repeat },
    { name: "Budgets", path: "/budgets", icon: PiggyBank },
    { name: "Trends", path: "/trends", icon: TrendingUp },
    {name: "Saving Goals",path: "/savings", icon: Target},
    { name: "Resources", path: "/resources", icon: BookOpen },
   
  ]

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-5">
        <h2 className="text-xl font-semibold tracking-tight">
          💰 Finance App
        </h2>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Button
                key={item.path}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "font-medium"
                )}
                onClick={() => {
                  navigate(item.path)
                  setOpen(false)
                }}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button
          variant="destructive"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
          
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
  return (
  <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-muted/40 text-foreground">

    {/* Desktop Sidebar */}
    <aside className="hidden md:flex md:w-64 md:fixed md:inset-y-0 md:left-0 
    border-r bg-card/80 backdrop-blur-xl shadow-xl">

      {SidebarContent}
    </aside>

    {/* Main Section */}
    <div className="flex flex-col flex-1 bg-fuchsia-100 md:ml-64">

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between 
      px-4 md:px-8 py-4 border-b bg-background/70 backdrop-blur-xl shadow-sm">

        {/* Mobile Menu */}
        <div className="md:hidden ">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5 " />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-0 bg-card">
              {SidebarContent}
            </SheetContent>
          </Sheet>
        </div>

        <h1 className="text-base md:text-lg font-semibold tracking-wide">
          {location.pathname.replace("/", "").toUpperCase() || "DASHBOARD"}
        </h1>

        <ThemeToggle />
      </header>

      {/* Scrollable Content */}
      <main className="flex-1  overflow-y-auto p-4 md:p-8">
        <Outlet />
      </main>

    </div>
  </div>
)

}