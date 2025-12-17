import { Header } from "@/components/Header"
import { dummyPromo } from "@/constants"
import { useAuth } from "@/context/AuthContext"
import { translate } from "@/i18n/translate"
import { useUserStore } from "@/store/userStore"
import { Stack, Tabs } from "expo-router"
import { goBack } from "expo-router/build/global-state/routing"

export default function UserLayout() {
  const { isAuthenticated } = useAuth()
  const { orders, messages, reviews } = useUserStore()
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <Header title={props.options.title as string} leftIcon="caretLeft" onLeftPress={goBack} />
        ),
      }}
    >
      {/* Automatically reidrects to login when not authenticated */}

      <Tabs.Protected guard={isAuthenticated}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="shipping-addresses"
          options={{
            title: translate("messageScreen:title", { count: messages.length }),
          }}
        />
        <Stack.Screen
          name="admin-reviews"
          options={{
            title: translate("reviewScreen:title", { count: reviews.length }),
          }}
        />
        <Stack.Screen
          name="admin-products"
          options={{
            headerTitle: "Manage Products",
            headerBackTitle: "Products",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="(admin)/admin-promos"
          options={{
            title: translate("promo:title", { count: dummyPromo.length }),
          }}
        />
        <Stack.Screen
          name="(admin)/admin-orders"
          options={{
            title: translate("order:title", { count: orders.length }),
          }}
        />
      </Tabs.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="(auth)/login"
          options={{
            headerShown: false,
            header: () => null,
          }}
        />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/password-reset" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/password-reset-request" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/password-reset-verification" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/password-reset-request-success"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  )
}
