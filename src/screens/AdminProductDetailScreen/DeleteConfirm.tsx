import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Text } from "@/components/Text"
import { View } from "react-native"

interface DeleteProductConfirmProps {
  orderCount: number
  onConfirm?: () => void
  onDismiss?: () => void
}
export default function DeleteProductConfirm({ orderCount, onDismiss }: DeleteProductConfirmProps) {
  if (orderCount && orderCount > 0) {
    return (
      <View style={{ width: "100%", height: "auto", gap: 20 }}>
        <Text tx="productDetail:delete" preset="subheading" />
        <Card
          ContentComponent={
            <Text>Product that has been ordered or reviewed cannot be deleted</Text>
          }
        />
        <Button tx="common:ok" onPress={onDismiss} />
      </View>
    )
  }
  return (
    <View style={{ width: "100%", height: "auto", gap: 20 }}>
      <Text tx="productDetail:delete" preset="subheading" />
      <Text>Are you sure you want to delete this product?</Text>
      <Button tx="common:confirm" />
    </View>
  )
}
