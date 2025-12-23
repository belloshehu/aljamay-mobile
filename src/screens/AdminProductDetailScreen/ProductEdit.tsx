import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ScrollView, ViewStyle } from "react-native"
import { ProductType } from "types/product.types"
import ProductForm from "../ProductScreen/ProductForm"

interface ProductEditProps {
  product: ProductType
  onClose?: () => void
}
export default function ProductEdit({ product, onClose }: ProductEditProps) {
  const { themed } = useAppTheme()
  const reviews = []
  return (
    <ScrollView contentContainerStyle={themed($container)}>
      <ProductForm product={product} onClose={onClose} />
    </ScrollView>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  width: "100%",

  padding: spacing.sm,
  gap: spacing.md,
})
