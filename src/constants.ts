import { ProductCategory, ProductType } from "types/product.types"

export const productCategories: ProductCategory[] = [
  {
    name: "All",
    image: require("@assets/images/product/bread.jpg"),
  },
  {
    name: "Bread",
    image: require("@assets/images/product/bread.jpg"),
  },
  {
    name: "Cake",
    image: require("@assets/images/product/bread.jpg"),
  },
  {
    name: "Tea",
    image: require("@assets/images/product/bread.jpg"),
  },
  {
    name: "Spices",
    image: require("@assets/images/product/bread.jpg"),
  },
]

export const dummyProducts: ProductType[] = [
  {
    id: "1212312",
    name: "Cake",
    status: "available",
    price: 1200,
    image: require("@assets/images/product/bread.jpg"),
    discount: 10,
    description: "Fresh bread for good health",
    quantity: 10,
  },

  {
    id: "1264432",
    name: "Bread",
    status: "available",
    price: 1200,
    image: require("@assets/images/product/bread.jpg"),
    discount: 12,
    quantity: 13,
    description: "Fresh bread for good health",
  },
  {
    id: "1234312",
    name: "Cake",
    status: "not available",
    price: 1200,
    image: require("@assets/images/product/cake.jpg"),
    discount: 5,
    quantity: 10,
    description: "Fresh cake for good health all types of events.",
  },
  {
    id: "1200312",
    name: "Cake bread",
    status: "available",
    price: 1200,
    image: require("@assets/images/product/bread.jpg"),
    discount: 15,
    quantity: 106,
    description: "Fresh bread for good health",
  },
  {
    id: "121231200",
    name: "Cake",
    status: "available",
    price: 1200,
    image: require("@assets/images/product/bread.jpg"),
    discount: 10,
    description: "Fresh bread for good health",
    quantity: 10,
  },

  {
    id: "1264432123",
    name: "Bread",
    status: "available",
    price: 1200,
    image: require("@assets/images/product/bread.jpg"),
    discount: 12,
    quantity: 13,
    description: "Fresh bread for good health",
  },
  {
    id: "1234312433",
    name: "Cake",
    status: "not available",
    price: 1200,
    image: require("@assets/images/product/cake.jpg"),
    discount: 5,
    quantity: 10,
    description: "Fresh cake for good health all types of events.",
  },
  {
    id: "1200312x32",
    name: "Cake bread",
    status: "available",
    price: 1200,
    image: require("@assets/images/product/bread.jpg"),
    discount: 15,
    quantity: 106,
    description: "Fresh bread for good health",
  },
]
