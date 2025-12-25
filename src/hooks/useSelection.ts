import { useCallback, useState } from "react"

export const useMultipleSelection = <T>() => {
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  // Add item to list if it is not already in the list
  // Remove item from list if it is already in the list
  // This is used selection of items
  const handleItemClick = useCallback((item: T) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((_item) => _item !== item)
      } else {
        return [...prevItems, item]
      }
    })
  }, [])
  return { handleItemClick, selectedItems }
}
