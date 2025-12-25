import { EmptyState } from "./EmptyState"

// PRODUCT EMPTY STATES
interface ProductListEmptyState {
  buttonOnPress?: () => void
}
export function ProductListEmptyState({ buttonOnPress }: ProductListEmptyState) {
  return (
    <EmptyState
      headingTx="emptyState:many.heading"
      headingTxOptions={{ items: "products" }}
      contentTx="emptyState:many.content"
      contentTxOptions={{ items: "products" }}
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
      headingTxOptions={{ item: "product" }}
      contentTx="emptyState:one.content"
      contentTxOptions={{ item: "product" }}
      buttonOnPress={buttonOnPress}
      ButtonProps={{ preset: "filled" }}
    />
  )
}

// ORDERS EMPTY STATES
interface ProductListEmptyState {
  buttonOnPress?: () => void
}
export function OrderListEmptyState({ buttonOnPress }: ProductListEmptyState) {
  return (
    <EmptyState
      headingTx="emptyState:many.heading"
      headingTxOptions={{ item: "order" }}
      contentTx="emptyState:many.content"
      contentTxOptions={{ item: "order" }}
      buttonOnPress={buttonOnPress}
    />
  )
}

interface ProductEmptyState {
  buttonOnPress?: () => void
}

export function OrderEmptyState({ buttonOnPress }: ProductEmptyState) {
  return (
    <EmptyState
      headingTx="emptyState:one.heading"
      headingTxOptions={{ items: "orders" }}
      contentTx="emptyState:one.content"
      contentTxOptions={{ items: "orders" }}
      buttonOnPress={buttonOnPress}
      ButtonProps={{ preset: "filled" }}
    />
  )
}
