import { Header } from "@/components/Header"
import { productCategories } from "@/constants"
import { Stack } from "expo-router"
import { goBack } from "expo-router/build/global-state/routing"

export default function CategoryLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#000" },
        header: (props) => (
          <Header
            titleTx="categories:title"
            titleTxOptions={{ count: productCategories.length }}
            leftIcon="caretLeft"
            onLeftPress={goBack}
            {...props}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
        }}
      />
      {/* Digital monitors */}
      <Stack.Screen
        name="[name]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
