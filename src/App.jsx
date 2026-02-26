import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Expenses from "./pages/Expenses";

import Budgets from "./pages/Budgets";
import IncomePage from "./pages/Income";
import Recurring from "./pages/Recurring";
import Split from "./pages/Split"
import ExpensesSummary from "./pages/ExpenseSummary";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import PrivateRoute from "./components/PrivateRoute";
import TrendsDashboard from "./pages/TrendsDashboard";
import Layout from "./layout/Layout";
import Resources from "./pages/Resources";
import SavingsGoals from "./components/SavingGoals";


function App(){
  const token=localStorage.getItem("token")
  return(
    <AuthProvider>
      <BrowserRouter>
      <Routes>

  <Route path="/" element={token ? <Navigate to="/dashboard"/> : <Landing/>} />
  <Route path="/signup" element={<Signup/>} />
  <Route path="/login" element={<Login/>} />

  {/* Protected Layout */}
  <Route element={<Layout/>}>

    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }
    />

    <Route path="/expenses" element={<Expenses/>} />
    <Route path="/budgets" element={<Budgets/>} />
    <Route path="/income" element={<IncomePage/>} />
    <Route path="/recurring" element={<Recurring/>} />
    <Route path="/split/:expenseId" element={<Split/>} />
    <Route path="/summary" element={<ExpensesSummary/>} />
    <Route path="/trends" element={<TrendsDashboard/>} />
    <Route path="/savings" element={<SavingsGoals/>}/>
   
    <Route path="/resources" element={<Resources/>}/>
    
  </Route>

</Routes>
       
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;