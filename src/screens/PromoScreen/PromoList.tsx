import React, { FC, JSX, ReactNode } from "react"
import { ActivityIndicator, FlatList, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { Card } from "@/components/Card"
import { Text } from "@/components/Text"
import { PromoItemType } from "types/promo.types"
import { Promo } from "./Promo"

interface PromoListProps {
  promos: PromoItemType[] | null
  isLoading: boolean
}

const PromoList: FC<PromoListProps> = (props: PromoListProps) => {
  const { themed } = useAppTheme()

  const { promos, isLoading } = props
  if (isLoading) return <ActivityIndicator />
  if (!promos) return <Card ContentComponent={<Text tx="productDetail:empty" />} />
  return (
    <FlatList
      renderItem={({ item: promo }) => <Promo promo={promo} key={promo.id} />}
      data={promos}
      horizontal={false}
      ItemSeparatorComponent={() => <View style={themed($separator)} />}
      contentContainerStyle={themed($containerStyle)}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  )
}

const $containerStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingBottom: 170,
})

const $separator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  height: 10,
})
export default PromoList
