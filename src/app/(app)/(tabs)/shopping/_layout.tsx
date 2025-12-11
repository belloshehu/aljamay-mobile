import { Header } from "@/components/Header"
import { Stack } from "expo-router"

export default function CategoryLayout() {
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
          headerShown: false,
          // header: (props) => <Header leftTx="categories:title" {...props} />,
        }}
      />
      {/* Digital monitors */}
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
    </Stack>
  )
}
