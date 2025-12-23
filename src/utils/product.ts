export const getDiscountPercent = (price: number, discount: number) => {
  return Math.ceil((discount / price) * 100)
}
