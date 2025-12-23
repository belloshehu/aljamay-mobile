import { Header } from "@/components/Header"
import { PressableIcon } from "@/components/Icon"
import { dummyPromo, productCategories } from "@/constants"
import { useAuth } from "@/context/AuthContext"
import { useGetProducts } from "@/hooks/service-hooks/product.service.hooks"
import { translate } from "@/i18n/translate"
import AdminProductScreenHeaderRight from "@/screens/AdminProductScreen/AdminProductScreenHeaderRight"
import { useUserStore } from "@/store/userStore"
import { Stack, Tabs } from "expo-router"
import { goBack } from "expo-router/build/global-state/routing"

export default function UserLayout() {
  const { isAuthenticated } = useAuth()
  const { orders, messages, reviews } = useUserStore()
  const { data: productsData } = useGetProducts({ limit: 1000, offset: 0 })
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
          name="(admin)/admin-reviews"
          options={{
            title: translate("reviewScreen:title", { count: reviews.length }),
          }}
        />
        <Stack.Screen
          name="(admin)/admin-products"
          options={{
            headerShown: true,
            title: translate("productList:title", { count: productsData?.length }),
            header: (props) => (
              <Header
                title={props.options.title as string}
                leftIcon="caretLeft"
                onLeftPress={goBack}
                RightActionComponent={<AdminProductScreenHeaderRight />}
              />
            ),
          }}
        />
        <Stack.Screen
          name="(admin)/product/[id]"
          options={{
            headerShown: false,
            title: translate("productList:title", { count: productCategories.length }),
            header: (props) => (
              <Header
                title={props.options.title as string}
                leftIcon="caretLeft"
                onLeftPress={goBack}
                RightActionComponent={<AdminProductScreenHeaderRight />}
              />
            ),
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
        <Stack.Screen
          name="(admin)/admin-categories"
          options={{
            title: translate("categories:title", { count: productCategories.length }),
            headerRight: () => <PressableIcon icon="back" size={24} />,
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
