import React from "react"
import { Tabs } from "expo-router/tabs"
import { Icon } from "@/components/Icon"

import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors } from "@/theme/colors"
import { spacing } from "@/theme/spacing"
import { typography } from "@/theme/typography"
import { translate } from "@/i18n/translate"

export default function Layout() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
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
          headerShown: false,
          tabBarLabel: translate("tabNavigator:categoriesTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="menu" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping-cart"
        options={{
          headerShown: false,
          tabBarAccessibilityLabel: translate("tabNavigator:shoppingCartTab"),
          tabBarLabel: translate("tabNavigator:shoppingCartTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="cart" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: translate("tabNavigator:profileTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="user" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
    </Tabs>
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
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
