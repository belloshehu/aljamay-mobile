import { EmptyState } from "../EmptyState"

interface ProductListEmptyState {
  buttonOnPress?: () => void
}
export function ProductListEmptyState({ buttonOnPress }: ProductListEmptyState) {
  return (
    <EmptyState
      headingTx="emptyState:many.heading"
      contentTx="emptyState:many.content"
      buttonOnPress={buttonOnPress}
    />
  )
}

interface ProductEmptyState {
  buttonOnPress?: () => void
}

export function ProductEmptyState({ buttonOnPress }: ProductEmptyState) {
  return (
    <EmptyState
      headingTx="emptyState:one.heading"
      contentTx="emptyState:one.content"
      buttonOnPress={buttonOnPress}
      ButtonProps={{ preset: "filled" }}
    />
  )
}
