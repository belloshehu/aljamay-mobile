import { useAuth } from "@/context/AuthContext"
import { LoginScreen } from "@/screens/LoginScreen/LoginScreen"
import { ComponentProps, JSX } from "react"

/*
 *  Higher Order Function (HOC) for protected screens
 */
export default function withAuth(Component: JSX.ElementType) {
  return (props: ComponentProps<any>) => {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) return <LoginScreen />
    return <Component {...props} />
  }
}
