import { useEffect } from "react"
import { BackHandler } from "react-native"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

export const useBottomSheetBackHandler = (
  bottomSheetRef: React.RefObject<BottomSheetModal | null>,
  isOpen: boolean,
) => {
  useEffect(() => {
    const onBackPress = () => {
      if (isOpen && bottomSheetRef?.current) {
        bottomSheetRef.current.close() // or snapToIndex(-1)
        return true // prevent default back navigation
      }
      return false
    }

    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress)

    return () => subscription.remove()
  }, [bottomSheetRef, isOpen])
}
