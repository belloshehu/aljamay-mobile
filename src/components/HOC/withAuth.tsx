import { useAuth } from "@/context/AuthContext"
import { push } from "expo-router/build/global-state/routing"
import { ComponentProps, JSX, useEffect } from "react"

/*
 *  Higher Order Function (HOC) for protected screens
 */
export default function withAuth(Component: JSX.ElementType) {
  return (props: ComponentProps<any>) => {
    const { isAuthenticated } = useAuth()
    useEffect(() => {
      if (!isAuthenticated) push("/user/login")
    }, [])

    return <Component {...props} />
  }
}
