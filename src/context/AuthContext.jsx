import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  // ✅ Safe initialization
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user")

      if (!storedUser || storedUser === "undefined") {
        return null
      }

      return JSON.parse(storedUser)
    } catch (error) {
      return null
    }
  })

  // ✅ Login function
  const login = (data) => {
    setUser(data)
    localStorage.setItem("user", JSON.stringify(data))
  }

  // ✅ Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}