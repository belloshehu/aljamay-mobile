import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { useLocalSearchParams } from "expo-router"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import Price from "@/components/product/Price"
import { useBottomSheetContext } from "@/context/BottomSheetContext"
import { useDeleteProduct, useGetProductById } from "@/hooks/service-hooks/product.service.hooks"
import { ProductEmptyState } from "@/components/CustomEmptyState"
import AdminProductDetailHeader from "./AdminProductDetailHeader"
import { useAxios } from "@/hooks/use-axios"
import { AccountItem } from "../AccountScreen/AccountItem"
import ProductReviews from "./ProductReviews"
import ProductOrders from "./ProductOrders"
import ProductEdit from "./ProductEdit"
import DeleteProductConfirm from "./DeleteConfirm"

export function AdminProductDetailScreen() {
  const { themed, theme } = useAppTheme()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { handleModalDismiss, setBottomChildren, handleModalPreset } = useBottomSheetContext()
  const { data: product, isLoading } = useGetProductById(id)
  const { mutateAsync: deleProduct, isPending: isDeleting } = useDeleteProduct(id)
  const { protectedRequest } = useAxios()

  // Press handle that triggers a bottomsheet to add product
  const showProductReviewsBottomSheet = () => {
    setBottomChildren(<ProductReviews reviews={product?.reviews!} />)
    handleModalPreset()
  }

  // product delete confirm
  const showProductDeleteConfirmBottomSheet = () => {
    setBottomChildren(
      <DeleteProductConfirm
        orderCount={product?.orderItems.length!}
        onConfirm={() => {
          deleProduct({ productId: id, protectedRequest })
        }}
        onDismiss={handleModalDismiss}
      />,
    )
    handleModalPreset()
  }
  const showProductOrdersBottomSheet = () => {
    setBottomChildren(<ProductOrders orders={product?.orderItems!} />)
    handleModalPreset()
  }

  // show edit product bottom sheet
  const showAddEditProductBottomSheet = () => {
    setBottomChildren(<ProductEdit product={product!} onClose={handleModalDismiss} />)
    handleModalPreset()
  }

  const handleDeleteProduct = () => {
    showProductDeleteConfirmBottomSheet()
  }

  if (isLoading) return <ActivityIndicator />
  if (!product) return <ProductEmptyState />
  return (
    <View style={$styles.flex1}>
      <View style={themed($container)}>
        <AdminProductDetailHeader product={product} />
        <View style={themed($bottmoContainer)}>
          <View style={themed($buttonWrapper)}>
            <Price
              price={product.price}
              discount={product.discount}
              priceStyle={themed($price)}
              discountStyle={themed($discount)}
            />
            <Text text={product.quantity + " in stock"} style={themed($quantity)} />
          </View>
          <View style={themed($buttonWrapper)}>
            <Button
              tx={isDeleting ? "progress:wait" : "productDetail:delete"}
              style={themed($cartButton)}
              onPress={handleDeleteProduct}
              textStyle={{ color: "#f00" }}
            />
            <Button
              tx="productDetail:edit"
              style={themed($cartButton)}
              onPress={showAddEditProductBottomSheet}
              textStyle={{ color: theme.colors.errorBackground }}
            />
          </View>

          <View style={{ marginVertical: 30 }}>
            <Text>{product.description}</Text>
          </View>

          <AccountItem
            icon="review"
            title="productDetail:reviews"
            onPress={showProductReviewsBottomSheet}
            count={product.reviews.length}
          />
          <AccountItem
            icon="order"
            title="productDetail:orders"
            onPress={showProductOrdersBottomSheet}
            count={product.orderItems.length}
          />
        </View>
      </View>
    </View>
  )
}

const $price: ThemedStyle<TextStyle> = ({ spacing, colors, typography }) => ({
  color: colors.text,
  fontSize: spacing.md,
  fontFamily: typography.code?.normal,
  fontWeight: "bold",
})

const $discount: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.md,
})

const $quantity: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.md,
  padding: spacing.xs,
  borderRadius: spacing.sm,
  borderColor: colors.errorBackground,
  borderWidth: 1,
  backgroundColor: "#fff",
})

const $cartButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: spacing.xl,
  paddingHorizontal: spacing.xl,
})

const $buttonWrapper: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  gap: 2,
})

const $container: ThemedStyle<ViewStyle> = ({}) => ({
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flex: 1,
  gap: 20,
})

const $bottmoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: 10,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.lg,
  marginTop: spacing.xl,
  flex: 0.68,
})
