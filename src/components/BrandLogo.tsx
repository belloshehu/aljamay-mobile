import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Link } from "expo-router"
import { FC } from "react"
import { Image, ImageStyle } from "react-native"
const welcomeLogo = require("@assets/images/logo.png")

const BrandLogo: FC = () => {
  const { themed } = useAppTheme()

  return (
    <Link href={"/"}>
      <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
    </Link>
  )
}

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
})

export default BrandLogo
