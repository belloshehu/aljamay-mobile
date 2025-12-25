import { NavigationContainer } from "@react-navigation/native"
import { render } from "@testing-library/react-native"

import { Text } from "./Text"
import { ThemeProvider } from "../theme/context"
import PhotoUpload from "./PhotoUpload"

/* This is an example component test using react-native-testing-library. For more
 * information on how to write your own, see the documentation here:
 * https://callstack.github.io/react-native-testing-library/ */
const testName = "Test string"
const testButtonText = "Click to upload"

const testSetFile = () =>
  void describe("PhotoUpload", () => {
    it("should render the image upload component with button text", () => {
      const { getByText } = render(
        <ThemeProvider>
          <NavigationContainer>
            <PhotoUpload name={testName} buttonText={testButtonText} setFile={testSetFile} />
          </NavigationContainer>
        </ThemeProvider>,
      )
      expect(getByText(testButtonText)).toBeDefined()
    })

    it("should render the image upload component with button", () => {
      const { getByRole } = render(
        <ThemeProvider>
          <NavigationContainer>
            <PhotoUpload name={testName} buttonText={testButtonText} setFile={testSetFile} />
          </NavigationContainer>
        </ThemeProvider>,
      )
      expect(getByRole("button")).toBeDefined()
    })
  })
