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
          headerShown: true,
          header: (props) => <Header leftTx="promo:title" {...props} />,
          // tabBarLabel: translate("tabNavigator:promo"),
        }}
      />
      {/* Digital monitors */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  )
}
