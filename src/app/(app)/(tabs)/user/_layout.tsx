import { useAuth } from "@/context/AuthContext"
import { Stack, Tabs } from "expo-router"

export default function UserLayout() {
  const { isAuthenticated } = useAuth()
  return (
    <Stack
      // initialRouteName="index"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#000" },
      }}
    >
      {/* Automatically reidrects to login when not authenticated */}

      <Tabs.Protected guard={isAuthenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/verification" options={{}} />
      </Tabs.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
      </Stack.Protected>
    </Stack>
  )
}
