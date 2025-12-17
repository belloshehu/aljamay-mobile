const productEn = {
  emptyState: {
    one: {
      heading: "Oops! Empty product",
      content: "No product found yet. Try clicking the button to refresh or reload the app",
    },
    many: {
      heading: "Oops! Empty products",
      content: "No products found yet. Try clicking the button to refresh or reload the app",
    },
  },
  productDetail: {
    notFound: "Product not found",
    checkout: "Checkout",
    cart: "Add to cart",
    discount: "Off",
    empty: "No products yet",
    goToList: "Check other products",
  },
  productList: {
    title: "Products ({{count}}) ",
    addProduct: "Add Product",
  },
  categories: {
    title: "Product Categories ({{count}})",
    description: "Various product categories for your refreshment.",
    notFound: "Product category not found",
    itemsInCategory: "Available items in {{name}}",
    numberOfCategories: "{{count}} categories",
    listDescription: "We have various categories of products for you.",
    categoryDetailHeading: "{{name}} category",
  },
  promo: {
    title: "Promos ({{count}})",
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
    itemsCount: "Product/Items ({{count}})",
  },
  productForm: {
    createTitle: "Create Product",
    editTitle: "Edit Product",
    nameLabel: "Product Name",
    namePlaceholder: "Enter product name",
    descriptionLabel: "Product Description",
    descriptionPlaceholder: "Enter product description",
    priceLabel: "Product Price",
    pricePlaceholder: "Enter product price",
    discountLabel: "Product Discount (Naira)",
    discountPlaceholder: "Enter product discount",
    categoryLabel: "Product Category",
    categoryPlaceholder: "Enter product category",
    quantityLabel: "Product Quantity",
    quantityPlaceholder: "Enter product quantity",
    imageLabel: "Product Image",
    submitButtonCreate: "Create Product",
    submitButtonEdit: "Update Product",
  },
}

export default productEn

export type ProductTranslation = typeof productEn
