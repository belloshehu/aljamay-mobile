import { Header } from "@/components/Header"
import { useAuth } from "@/context/AuthContext"
import { useCartStore } from "@/store/cartStore"
import { Redirect, Stack } from "expo-router"
import { goBack } from "expo-router/build/global-state/routing"

export default function CategoryLayout() {
  const { cartItems } = useCartStore()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Redirect href={"/user/login"} />
  }

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#000" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: (props) => (
            <Header
              leftIcon="caretLeft"
              titleTx="cart:title"
              titleTxOptions={{ count: cartItems.length }}
              onLeftPress={goBack}
              {...props}
            />
          ),
        }}
      />
      {/* Digital monitors */}
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
    </Stack>
  )
}
