import { Header } from "@/components/Header"
import { useCartStore } from "@/store/cartStore"
import { Stack } from "expo-router"
import { goBack } from "expo-router/build/global-state/routing"

export default function CategoryLayout() {
  const { items } = useCartStore()
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
              titleTxOptions={{ count: items }}
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
