import NetInfo from "@react-native-community/netinfo"
import React, { createContext, useContext, useMemo } from "react"

type OnlineContextValue = {
  isOnline: boolean
}

const OnlineContext = createContext<OnlineContextValue | undefined>(undefined)

export function OnlineProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, isInternetReachable } = NetInfo.useNetInfo()

  const isOnline = useMemo(() => {
    if (isConnected === false) return false
    if (isInternetReachable === false) return false
    return true
  }, [isConnected, isInternetReachable])

  return <OnlineContext.Provider value={{ isOnline }}>{children}</OnlineContext.Provider>
}

export function useOnline() {
  const context = useContext(OnlineContext)

  if (!context) {
    throw new Error("useOnline must be used within an OnlineProvider")
  }

  return context.isOnline
}
