import axios from "axios"
import CartServiceAPI from "./cart.service"
import { CartItemResponseType } from "types/cart.types"

const request = axios.create()
const mockCartItems: CartItemResponseType = {
  data: [
    {
      id: "123",
      product: {
        description: "Product description",
        discount: 100,
        id: "1234",
        image: "/image.png",
        name: "bread",
        price: 2000,
        quantity: 20,
      },
      quantity: 3,
    },
  ],
  message: "List of carts",
}

test("handle fetching list of cart items", () => {
  expect(
    CartServiceAPI.getCartItems({ protectedRequest: request }).then(() => mockCartItems),
  ).toContain({ message: "List of carts" })
})
