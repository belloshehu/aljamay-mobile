import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet"
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react"
import { StyleSheet } from "react-native"

type CustomBottomSheetContextType = {
  handleModalPreset: () => void
  handleModalDismiss: () => void
  handleChange?: () => void
  setBottomChildren: Dispatch<SetStateAction<ReactNode>>
}

const _snapPoints = ["55%"]

type CustomBottomSheetConextProviderType = {
  children: ReactNode
}

const CustomBottomSheetContext = createContext<CustomBottomSheetContextType | null>(null)

export const CustomBottomSheetContextProvider: FC<CustomBottomSheetConextProviderType> = ({
  children,
}) => {
  const [bottomChildren, setBottomChildren] = useState<ReactNode | null>(null)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // const [snapPoints, setSnapPoints] = useState<[]>(_snapPoints)

  const handleModalPreset = useCallback(() => bottomSheetModalRef.current?.present(), [])

  const handleModalDismiss = useCallback(() => bottomSheetModalRef.current?.close(), [])

  return (
    <BottomSheetModalProvider>
      <CustomBottomSheetContext.Provider
        value={{ handleModalPreset, setBottomChildren, handleModalDismiss }}
      >
        {children}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={_snapPoints}
          onDismiss={() => {
            setBottomChildren(null)
          }}
          enableDynamicSizing
          backgroundStyle={{ backgroundColor: "rgba(250, 250, 250, 1)" }}
        >
          <BottomSheetScrollView contentContainerStyle={styles.bottomSheetView}>
            {bottomChildren}
          </BottomSheetScrollView>
        </BottomSheetModal>
      </CustomBottomSheetContext.Provider>
    </BottomSheetModalProvider>
  )
}

export const useBottomSheetContext = () =>
  useContext(CustomBottomSheetContext) as CustomBottomSheetContextType

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  bottomSheetView: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
    flex: 1,
    paddingHorizontal: 20,
  },
})
