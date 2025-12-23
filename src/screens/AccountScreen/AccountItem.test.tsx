import { ThemeProvider } from "@/theme/context"
import { NavigationContainer } from "@react-navigation/native"
import { render } from "@testing-library/react-native"
import { AccountItem } from "./AccountItem"
import { IconTypes } from "@/components/Icon"
import { TxKeyPath } from "@/i18n"
import { View } from "react-native"

/* This is an example component test using react-native-testing-library. For more
 * information on how to write your own, see the documentation here:
 * https://callstack.github.io/react-native-testing-library/ */
const itemTitle: TxKeyPath = "promo"
const itemIcon: IconTypes = "promo"
const itemCount = 12

describe("AccountItem", () => {
  it("should render the Account item with count", () => {
    const { getByText } = render(
      <ThemeProvider>
        <NavigationContainer>
          <View>
            <AccountItem count={itemCount} title={itemTitle} icon={itemIcon} />
          </View>
        </NavigationContainer>
      </ThemeProvider>,
    )
    expect(getByText(itemTitle)).toBeDefined()
  })
})
