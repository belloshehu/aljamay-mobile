const productEn = {
  productDetail: {
    notFound: "Product not found",
    checkout: "Place order",
    cart: "Add to cart",
    discount: "Off",
    empty: "No products yet",
    goToList: "Check other products",
  },
  categories: {
    title: "Product Categories ",
    description: "Various product categories for your refreshment.",
    notFound: "Product category not found",
    itemsInCategory: "Available items in {{name}}",
    numberOfCategories: "{{count}} categories",
    listDescription: "We have various categories of products for you.",
  },
  promo: {
    title: "Promos",
    description: "Various promotion plans to make your refreshment more affordable.",
    notFound: "Promo not found",
    countDown: "{{days}} days to go",
    productList: "Products in the promo ({{count}})",
  },
  cart: {
    loading: "Loading cart items",
    noItems: "No cart items.",
    title: "Cart Items ({{count}})",
    add: "Add a product",
  },
  checkout: {
    title: "Checkout ({{count}})",
    proceedToPayment: "Proceed to payment",
    productSection: {
      count: "Products ({{count}})",
    },
    shippinMethod: {
      title: "Shipping Method",
      select: "Select",
    },
    shippingAddress: {
      title: "Shipping Address",
      addAddress: "Add address",
      loading: "Loading address",
      empty: "No addresses",
    },
  },
  order: {
    title: "Orders ({{count}})",
    loadingMany: "Loading orders",
    loadingOne: "Loading order",
    emptyMany: "No orders",
    emptyOne: "No order",
    goToCart: "Go to cart",
    orderHeading: "Ordered on, {{date}}",
  },
}

export default productEn

export type ProductTranslation = typeof productEn
