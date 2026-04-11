import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"
import * as SplashScreen from "expo-splash-screen"
import { View, StyleSheet } from "react-native"
import { Asset } from "expo-asset"
import { useEffect } from "react"

export default function AnimatedSplashScreen({ onFinish }: { onFinish?: () => void }) {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.8)

  useEffect(() => {
    const prepare = async () => {
      // 👇 preload image
      await Asset.loadAsync(require("@assets/images/splash-icon.png"))

      // start animation AFTER image loads
      opacity.value = withTiming(1, { duration: 800 })
      scale.value = withTiming(1, { duration: 800 })

      setTimeout(async () => {
        await SplashScreen.hideAsync()
        onFinish && onFinish()
      }, 1200)
    }

    prepare()
  }, [])

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 })
    scale.value = withTiming(1, { duration: 800 })

    setTimeout(async () => {
      await SplashScreen.hideAsync()
      onFinish?.()
    }, 1200)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@assets/images/splash-icon.png")}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c0df87",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
})
