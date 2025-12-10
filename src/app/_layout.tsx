import { useEffect, useState } from "react"
import { Slot, SplashScreen } from "expo-router"
import { useFonts } from "@expo-google-fonts/space-grotesk"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"
import { LogBox } from "react-native"

import { initI18n } from "@/i18n"
import { ThemeProvider } from "@/theme/context"
import { customFontsToLoad } from "@/theme/typography"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { AuthProvider } from "@/context/AuthContext"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { CustomBottomSheetContextProvider } from "@/context/BottomSheetContext"
import { GestureHandlerRootView } from "react-native-gesture-handler"

SplashScreen.preventAutoHideAsync()
LogBox.ignoreAllLogs() // ⚠ hides ALL yellow warnings (optional)

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("@/devtools/ReactotronConfig")
}

export default function Root() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const queryClient = new QueryClient()
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* <ToastManager> */}
      <GestureHandlerRootView>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <CustomBottomSheetContextProvider>
                <KeyboardProvider>
                  <Slot />
                  <Toast />
                </KeyboardProvider>
              </CustomBottomSheetContextProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </GestureHandlerRootView>
      {/* </ToastManager> */}
    </SafeAreaProvider>
  )
}
