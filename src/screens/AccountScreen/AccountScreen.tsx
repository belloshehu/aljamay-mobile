import { FC, useMemo } from "react"
import { Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext" // @demo remove-current-line
import { isRTL } from "@/i18n"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { AccountItem } from "./AccountItem"
import { adminAccountItem, userAccountItem } from "@/constants"
import withAuth from "@/components/HOC/withAuth"
import { useBottomSheetContext } from "@/context/BottomSheetContext"
import { Icon } from "@/components/Icon"
import { spacing } from "@/theme/spacing"
import AccountPhotoUpdate from "./AccountPhotoUpdate"

const defaultProfileImage = require("@assets/images/users/man.png")

const AccountScreen: FC = function AccountScreen() {
  const { themed, theme } = useAppTheme()
  const { logout, user } = useAuth()

  const { setBottomChildren, handleModalPreset, handleModalDismiss } = useBottomSheetContext()

  const renderAccountItems = useMemo(() => {
    if (user?.role === "ADMIN") {
      return adminAccountItem.map((item, index) => (
        <AccountItem
          key={index}
          icon={item.icon}
          title={item.title}
          count={item.count}
          onPress={item.onPress}
        />
      ))
    } else if (user?.role === "USER") {
      return userAccountItem.map((item, index) => (
        <AccountItem
          key={index}
          icon={item.icon}
          title={item.title}
          count={item.count}
          onPress={item.onPress}
        />
      ))
    } else {
      return <Text text="No account items available" />
    }
  }, [])

  // show logout bottomsheet
  const showLogoutBottomSheet = () => {
    setBottomChildren(
      <View style={{ width: "100%", gap: 20 }}>
        <Text tx="common:logOut" preset="subheading" />
        <Text>Are you sure you want to logout?</Text>
        <Button
          tx="common:logOut"
          onPress={() => {
            logout()
            handleModalDismiss()
          }}
          style={{ width: "100%" }}
        />
      </View>,
    )
    handleModalPreset()
  }

  // show logout bottomsheet
  const showPhotoUpdateBottomSheet = () => {
    setBottomChildren(<AccountPhotoUpdate imageUrl={user?.image!} />)
    handleModalPreset()
  }

  return (
    <Screen preset="auto" contentContainerStyle={[$styles.flex1]}>
      <View style={themed($mainContainer)}>
        <View style={themed($topContainer)}>
          <TouchableOpacity onPress={showPhotoUpdateBottomSheet} style={themed($icon)}>
            <Icon icon="edit" size={30} />
          </TouchableOpacity>
          <Image src={user?.image || defaultProfileImage} style={themed($profileFace)} />
          <Text text={user?.firstName + " " + user?.lastName} style={themed($names)} />
          <Text text={user?.email} />
          {user?.role === "ADMIN" && (
            <Text
              text="Administrator"
              style={{
                backgroundColor: theme.colors.errorBackground,
                borderRadius: theme.spacing.sm,
                paddingHorizontal: theme.spacing.sm,
                color: "#fff",
                fontSize: spacing.sm,
              }}
            />
          )}
        </View>
        <View style={{ gap: 5, flex: 1, justifyContent: "flex-start" }}>{renderAccountItems}</View>
        <AccountItem icon="user" title="common:logOut" onPress={showLogoutBottomSheet} />
      </View>
    </Screen>
  )
}

const $mainContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  flex: 1,
  width: "100%",
  gap: spacing.sm,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  width: "100%",
  flex: 0.7,
  gap: spacing.xs,
  backgroundColor: "#fff",
  borderTopLeftRadius: spacing.xxl,
  borderBottomRightRadius: spacing.xxl,
})

const $profileFace: ImageStyle = {
  height: 120,
  width: 120,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
  resizeMode: "cover",
  objectFit: "cover",
  borderRadius: 60,
}

const $names: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontWeight: "bold",
  color: colors.errorBackground,
  fontSize: spacing.lg,
})

const $icon: ThemedStyle<ImageStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  right: 10,
  top: 10,
  backgroundColor: colors.errorBackground,
  borderRadius: spacing.md,
  padding: spacing.xxs,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  backgroundColor: colors.errorBackground,
  width: "100%",
})

export default withAuth(AccountScreen)
