import React from "react"
import { Image, StyleSheet, View, Text, TextStyle } from "react-native"
import { Dropdown } from "react-native-element-dropdown"
import AntDesign from "@expo/vector-icons/AntDesign"
import { SelectDataType } from "types/data.types"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"

interface DropdownComponentProps {
  data: Array<{ label: string; value: any }>
  placeholder?: string
  search?: boolean
  setValue: (value: any) => void
  value: any
  name?: string
  withImage?: boolean
  dropdownStyle?: object
  LeftAccessory?: () => React.ReactNode
}

const DropdownComponent = (props: DropdownComponentProps) => {
  const { themed } = useAppTheme()
  const {
    data,
    placeholder = "Select item",
    search = false,
    setValue,
    value,
    withImage = false,
    dropdownStyle = {},
    LeftAccessory,
  } = props

  const renderItem = (item: SelectDataType) => {
    return (
      <View style={styles.renderItemContainer}>
        {withImage && <Image src={item.value} style={styles.itemImage} />}
        <Text>{item.label}</Text>
      </View>
    )
  }
  return (
    <Dropdown
      style={[styles.dropdown, dropdownStyle, { ...themed($inputStyle) }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search={search}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Search..."
      containerStyle={{ bottom: 40 }}
      value={value}
      onChange={(item) => {
        setValue(item.value)
      }}
      renderLeftIcon={() => (LeftAccessory ? <LeftAccessory /> : null)}
      renderItem={renderItem}
    />
  )
}

export default DropdownComponent

const $inputStyle: ThemedStyle<TextStyle> = ({ colors, typography, spacing }) => ({
  flex: 1,
  alignSelf: "stretch",
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: 16,
  height: 24,
  padding: spacing.sm,
  paddingVertical: spacing.lg,
  marginVertical: spacing.xs,
  marginBottom: spacing.md,
  borderRadius: spacing.xxs,
})

const styles = StyleSheet.create({
  dropdown: {
    margin: 0,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    minWidth: "100%",
    backgroundColor: "#fff",
    marginHorizontal: "auto",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 24,
    height: 24,
    color: "#08566e",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  renderItemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 25,
    borderWidth: 1,
  },
})
