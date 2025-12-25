import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react"
import { ShippingAddressType } from "types/shipping.types"

type CheckoutContextType = {
  address: ShippingAddressType | null
  setAddress: (address: ShippingAddressType) => void
}

const CheckoutContext = createContext<CheckoutContextType | null>(null)

interface CheckoutContextProps {}
export const CheckoutProvider: FC<PropsWithChildren<CheckoutContextProps>> = ({ children }) => {
  const [_address, _setAddress] = useState<ShippingAddressType | null>(null)

  const setAddress = useCallback(
    (address: ShippingAddressType) => {
      _setAddress(address)
    },
    [_setAddress],
  )

  return (
    <CheckoutContext.Provider value={{ address: _address, setAddress }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckoutContext = () => useContext(CheckoutContext) as CheckoutContextType
