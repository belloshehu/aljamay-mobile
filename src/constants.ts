import { ProductCategory, ProductType } from "types/product.types"
import { PromoItemType } from "types/promo.types"
import { IconTypes } from "./components/Icon"
import { SelectDataType } from "types/data.types"
import { AccountItem } from "types/auth.types"
import { push } from "expo-router/build/global-state/routing"

// Account data
export const adminAccountItem: AccountItem[] = [
  {
    title: "profileScreen:accountItem.admin.orders",
    icon: "order",
    onPress: () => push("/user/admin-orders"),
  },
  {
    title: "profileScreen:accountItem.admin.products",
    icon: "spices",
    onPress: () => push("/user/admin-products"),
  },
  {
    title: "profileScreen:accountItem.admin.promos",
    icon: "promo",
    onPress: () => push("/user/admin-promos"),
  },
  {
    title: "profileScreen:accountItem.admin.categories",
    icon: "category",
    onPress: () => push("/user/admin-categories"),
  },
  {
    title: "profileScreen:accountItem.admin.reviews",
    icon: "review",
    onPress: () => push("/user/admin-reviews"),
  },
]

export const userAccountItem: AccountItem[] = [
  {
    title: "profileScreen:accountItem.user.orders",
    icon: "order",
    onPress: () => push("/user/orders"),
  },
  {
    title: "profileScreen:accountItem.user.messages",
    icon: "message",
    onPress: () => push("/user/messages"),
  },
  {
    title: "profileScreen:accountItem.user.reviews",
    icon: "review",
    onPress: () => push("/user/reviews"),
  },
  {
    title: "profileScreen:accountItem.user.addresses",
    icon: "location",
    onPress: () => push("/user/shipping-addresses"),
  },
]
export const dummyPromo: PromoItemType[] = [
  {
    id: "i349893894894",
    title: "New Year sale",
    images: [
      require("@assets/images/product/bread.jpg"),
      require("@assets/images/product/bread.jpg"),
    ],
    description:
      "Exlusive discount to mark the end of our business year of 2025. There will be price slashes across all our products",
    startDate: new Date(),
    stopDate: new Date(),
  },
  {
    id: "i34989384475798224",
    title: "Ramadan Sale",
    images: [
      require("@assets/images/product/bread.jpg"),
      require("@assets/images/product/bread.jpg"),
    ],
    description:
      "Exlusive discount for our Muslim customers who are observing Ramadan fasting. It a time of blessing, sharing and dedication.",
    startDate: new Date(),
    stopDate: new Date(),
  },
]
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
    image: require("@assets/images/product/cake.jpg"),
  },
  {
    name: "Tea",
    image: require("@assets/images/product/bread.jpg"),
  },
  {
    name: "Spices",
    image: require("@assets/images/product/spices.jpg"),
  },
  // {
  //   name: "Herbs",
  //   image: require("@assets/images/product/bread.jpg"),
  // },
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

export const productCategoryOptions: SelectDataType[] = [
  {
    label: "All Products",
    value: "all",
  },
  {
    label: "Cakes",
    value: "cakes",
  },
  {
    label: "Breads",
    value: "breads",
  },
  {
    label: "Spicies",
    value: "spicies",
  },
]

export const productSortOptions: SelectDataType[] = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Price: Low to High",
    value: "price-low-high",
  },
  {
    label: "Price: High to Low",
    value: "price-high-low",
  },
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
]

export const statesInNigeria: SelectDataType[] = [
  { label: "Abia", value: "Abia" },
  { label: "Adamawa", value: "Adamawa" },
  { label: "Akwa Ibom", value: "Akwa Ibom" },
  { label: "Anambra", value: "Anambra" },
  { label: "Bauchi", value: "Bauchi" },
  { label: "Bayelsa", value: "Bayelsa" },
  { label: "Benue", value: "Benue" },
  { label: "Borno", value: "Borno" },
  { label: "Cross River", value: "Cross River" },
  { label: "Delta", value: "Delta" },
  { label: "Ebonyi", value: "Ebonyi" },
  { label: "Edo", value: "Edo" },
  { label: "Ekiti", value: "Ekiti" },
  { label: "Enugu", value: "Enugu" },
  { label: "Gombe", value: "Gombe" },
  { label: "Imo", value: "Imo" },
  { label: "Jigawa", value: "Jigawa" },
  { label: "Kaduna", value: "Kaduna" },
  { label: "Kano", value: "Kano" },
  { label: "Katsina", value: "Katsina" },
  { label: "Kebbi", value: "Kebbi" },
  { label: "Kogi", value: "Kogi" },
  { label: "Kwara", value: "Kwara" },
  { label: "Lagos", value: "Lagos" },
  { label: "Nasarawa", value: "Nasarawa" },
  { label: "Niger", value: "Niger" },
  { label: "Ogun", value: "Ogun" },
  { label: "Ondo", value: "Ondo" },
  { label: "Osun", value: "Osun" },
  { label: "Oyo", value: "Oyo" },
  { label: "Plateau", value: "Plateau" },
  { label: "Rivers", value: "Rivers" },
  { label: "Sokoto", value: "Sokoto" },
  { label: "Taraba", value: "Taraba" },
  { label: "Yobe", value: "Yobe" },
  { label: "Zamfara", value: "Zamfara" },
  { label: "Abuja", value: "Abuja" },
]

export const productCategoriesWithImages: {
  name: string
  icon: IconTypes
}[] = [
  {
    name: "All",
    icon: "category",
  },
  {
    name: "Bread",
    icon: "bread",
  },
  {
    name: "Spices",
    icon: "spices",
  },

  {
    name: "Tea",
    icon: "tea",
  },
]
