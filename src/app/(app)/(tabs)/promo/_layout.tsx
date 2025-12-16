import { Header } from "@/components/Header"
import { Stack } from "expo-router"
import { goBack } from "expo-router/build/global-state/routing"

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
          header: (props) => (
            <Header {...props} titleTx="promo:title" leftIcon="caretLeft" onLeftPress={goBack} />
          ),
          // tabBarLabel: translate("tabNavigator:promo"),
        }}
      />
      {/* Digital monitors */}
      <Stack.Screen name="[id]" />
    </Stack>
  )
}
