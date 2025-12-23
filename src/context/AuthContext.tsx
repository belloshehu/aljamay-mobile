import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo } from "react"
import { useMMKVObject, useMMKVString } from "react-native-mmkv"
import { UserType } from "types/auth.types"

export type AuthContextType = {
  isAuthenticated: boolean
  authToken?: string
  authEmail?: string
  setAuthToken: (token?: string) => void
  setAuthEmail: (email: string) => void
  logout: () => void
  validationError: string
  user: UserType | null | undefined
  setUser: (user: UserType | null) => void
  login: (token: string, user: UserType) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export interface AuthProviderProps {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({ children }) => {
  const [authToken, setAuthToken] = useMMKVString("AuthProvider.authToken")
  const [authEmail, setAuthEmail] = useMMKVString("AuthProvider.authEmail")
  const [user, setUser] = useMMKVObject<UserType | null>("AuthProvider.user")

  const logout = useCallback(() => {
    setAuthToken(undefined)
    setAuthEmail("")
    setUser(null)
  }, [setAuthEmail, setAuthToken])

  const login = useCallback(
    (token: string, user: UserType) => {
      if (token && user) {
        setAuthToken(token)
        setUser(user)
      } else {
        if (__DEV__) {
          console.error("Invalid token or user")
        }
      }
    },
    [setAuthToken, setUser],
  )

  const refreshToken = useCallback(() => {}, [])

  const validationError = useMemo(() => {
    if (!authEmail || authEmail.length === 0) return "can't be blank"
    if (authEmail.length < 6) return "must be at least 6 characters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail)) return "must be a valid email address"
    return ""
  }, [authEmail])

  const value = {
    isAuthenticated: !!authToken,
    authToken,
    authEmail,
    setAuthToken,
    setAuthEmail,
    logout,
    validationError,
    login,
    user,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

// @demo remove-file
