import { Card } from "@/components/Card"
import { EmptyState } from "@/components/EmptyState"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { View, ViewStyle } from "react-native"
import { Review } from "types/product.types"

interface ProductReviewsProps {
  reviews: Review[] | null
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  const { themed } = useAppTheme()

  if (!reviews || reviews.length === 0) return <EmptyState />
  return (
    <View style={themed($container)}>
      <Text tx="productDetail:reviews" txOptions={{ count: reviews.length }} />
      <View>
        {reviews.map((review) => (
          <Card key={review.id} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold" }}>{review.userId}</Text>
            <Text>{review.comment}</Text>
            <Text tx="productDetail:rating" txOptions={{ rating: review.rating }} />
          </Card>
        ))}
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  width: "100%",

  padding: spacing.sm,
  gap: spacing.md,
})
