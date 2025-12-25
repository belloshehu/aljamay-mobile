import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { translate } from "@/i18n/translate"
import { FC } from "react"
import { View } from "react-native"
import { AddProductModal } from "./AddProductModal"

interface AdminProductScreenHeaderRightProps {}

const AdminProductScreenHeaderRight: FC<AdminProductScreenHeaderRightProps> = (
  props: AdminProductScreenHeaderRightProps,
) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        marginLeft: "auto",
      }}
    >
      <Modal
        title={translate("productList:addProduct")}
        TriggerComponent={({ onPress }) => (
          <Button tx="productList:addProduct" preset="filled" onPress={onPress} />
        )}
        RenderedModalChildren={({ onClose }) => <AddProductModal onClose={onClose} />}
        // renderedModalChildren={<AddProductModal />}
      />
    </View>
  )
}

export default AdminProductScreenHeaderRight
