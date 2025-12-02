const productEn = {
  productDetail: {
    notFound: "Product not found",
    checkout: "Place order",
    cart: "Add to cart",
    discount: "Off",
    empty: "No products yet",
  },
  categories: {
    title: "Product Categories ",
    description: "Various product categories for your refreshment.",
    notFound: "Product category not found",
    itemsInCategory: "Available items in {{name}}",
  },
  promo: {
    title: "Promos",
    description: "Various promotion plans to make your refreshment more affordable.",
  },
}

export default productEn

export type ProductTranslation = typeof productEn
