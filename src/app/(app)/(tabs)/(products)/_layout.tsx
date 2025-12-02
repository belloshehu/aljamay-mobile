import { Icon } from "@/components/Icon"
import { translate } from "@/i18n/translate"
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
