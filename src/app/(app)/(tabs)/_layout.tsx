import React, { useEffect } from "react"
import { Tabs } from "expo-router/tabs"
import { Icon } from "@/components/Icon"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { typography } from "@/theme/typography"
import { translate } from "@/i18n/translate"
import { useSegments, Route } from "expo-router"
import { dummyPromo, productCategories } from "@/constants"
import { useCartStore } from "@/store/cartStore"
import { useUserStore } from "@/store/userStore"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"

export default function Layout() {
  const { bottom } = useSafeAreaInsets()
  const segments = useSegments<Route>()
  const { items } = useCartStore()
  const { messages } = useUserStore()
  const { themed, theme } = useAppTheme()

  const hideTabBar =
    segments.includes("product" as never) ||
    segments.includes("user" as never) ||
    segments.includes("promo" as never) ||
    segments.includes("categories" as never) ||
    segments.includes("shopping" as never)
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [$tabBar, { height: bottom + 70, display: hideTabBar ? "none" : "flex" }],
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: $tabBarLabel,
          tabBarItemStyle: $tabBarItem,
          tabBarBadgeStyle: themed($tabBarBadgeStyle),
        }}
      >
        <Tabs.Screen
          name="(products)"
          options={{
            headerShown: false,
            tabBarLabel: translate("tabNavigator:homeTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="home" color={focused ? colors.tint : undefined} size={30} />
            ),
          }}
        />

        <Tabs.Screen
          name="categories"
          options={{
            tabBarLabel: translate("tabNavigator:categoriesTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="category" color={focused ? colors.tint : undefined} size={30} />
            ),
            tabBarBadge: productCategories.length,
          }}
        />

        <Tabs.Screen
          name="promo"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon icon="bell" color={focused ? colors.tint : undefined} size={30} />
            ),
            tabBarBadge: dummyPromo.length,
          }}
        />

        <Tabs.Screen
          name="shopping"
          options={{
            tabBarLabel: translate("tabNavigator:shoppingCartTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="cart" color={focused ? colors.tint : undefined} size={30} />
            ),
            tabBarBadge: items, // count of items in the cart
          }}
        />

        {/*  Profile, Shopping cart, login and signup screens are grouped here */}

        <Tabs.Screen
          name="user"
          options={{
            headerShown: false,
            tabBarLabel: translate("tabNavigator:profileTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="user" color={focused ? colors.tint : undefined} size={30} />
            ),
            tabBarBadge: messages.length,
          }}
        />
      </Tabs>
    </>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.normal,
  lineHeight: 16,
  flex: 1,
}

const $tabBarBadgeStyle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: "#fff",
  backgroundColor: colors.errorBackground,
})
