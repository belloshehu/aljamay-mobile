import { Stack } from "expo-router"

export default function ProductLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#000" },
      }}
    >
      {/* Digital monitors */}
      <Stack.Screen name="(detail)/product/[id]" />
    </Stack>
  )
}
