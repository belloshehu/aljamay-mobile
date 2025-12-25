import { FC, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import CategoryList from "@/components/category/ProductCategoryList"
import { productCategories } from "@/constants"
import ProductSearchModal from "@/screens/ProductScreen/ProductSearchModal"
import { Marquee } from "@animatereactnative/marquee"
import { Text } from "@/components/Text"
import LottieView from "lottie-react-native"
import { Overlay } from "@/components/Overlay"
import { animationStyles } from "@/styles/animation.style"
import { createAnimatedComponent } from "react-native-reanimated"

export const HomeScreen: FC = function HomeScreen() {
  const { themed, theme } = useAppTheme()
  const [animationDate, setAnimationDate] = useState<number>(2025)

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setAnimationDate(2000)
    }, 6000)
    return () => clearTimeout(timeOut)
  }, [])

  const AnimatedText = createAnimatedComponent(Text)
  return (
    <Screen preset="fixed" contentContainerStyle={[$styles.flex1]}>
      <View style={themed($topContainer)}>
        <Marquee spacing={2} speed={1}>
          <View style={themed($marquee)}>
            <Text style={{ color: "green" }}>Happy new year in advance. </Text>
            <LottieView
              autoPlay
              style={{
                width: 70,
                height: 40,
                // backgroundColor: "#fff",
              }}
              source={require("@assets/animations/celebrate.json")}
            />
          </View>
        </Marquee>
        <ProductSearchModal />
        <CategoryList categories={productCategories} />
      </View>
      <Overlay visible={new Date().getFullYear() === animationDate}>
        <AnimatedText
          style={[{ color: theme.colors.errorBackground }, animationStyles.slideInYAmination]}
          preset="heading"
        >
          Happy new Year
        </AnimatedText>
        <LottieView
          autoPlay
          style={{
            width: 500,
            height: 500,
          }}
          source={require("@assets/animations/congratulation.json")}
        />
      </Overlay>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  paddingHorizontal: spacing.xxs,
  flex: 1,
})

const $marquee: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  // backgroundColor: colors.errorBackground,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.xxxs,
  borderRadius: spacing.sm,
})
