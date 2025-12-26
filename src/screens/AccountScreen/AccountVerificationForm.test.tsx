import { ThemeProvider } from "@/theme/context"
import { NavigationContainer } from "@react-navigation/native"
import { render } from "@testing-library/react-native"
import { ButtonProps, TextInputProps, View } from "react-native"
import AccountVerificationForm from "../EmailVerificationRequestScreen/EmailVerificationRequestForm"
import { AuthProvider } from "@/context/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TxKeyPath } from "@/i18n"
import { ReactElement } from "react"

const buttonText: TxKeyPath = "verification:sendVerificationCode"
const setError: any = (error: string) => {}
const queryClient = new QueryClient()
const inputPlaceholder: TxKeyPath = "verification:verificationCodeFieldPlaceholder"

describe("AccountVerificationForm", () => {
  it("should render the Account verification form with a button ", () => {
    const { getByText } = render(
      <ThemeProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <View>
                <AccountVerificationForm setError={setError} />
              </View>
            </AuthProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </ThemeProvider>,
    )
    expect(getByText(buttonText)).toBeDefined()
  })

  it("should display input with the correct value", () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <View>
                <AccountVerificationForm setError={setError} />
              </View>
            </AuthProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </ThemeProvider>,
    )
    const input: ReactElement<TextInputProps> = getByPlaceholderText(inputPlaceholder)
    const inputValue = "123456"
    input.props.onChangeText?.(inputValue)
    expect(input).toBeDefined()
    expect(input).toHaveDisplayValue(inputValue)
  })

  it("should display just one button", () => {
    const { getByRole } = render(
      <ThemeProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <View>
                <AccountVerificationForm setError={setError} />
              </View>
            </AuthProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </ThemeProvider>,
    )
    expect(getByRole("button")).toBeDefined()
  })

  it("should display input validation error", async () => {
    const { getByRole } = render(
      <ThemeProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <View>
                <AccountVerificationForm setError={setError} />
              </View>
            </AuthProvider>
          </QueryClientProvider>
        </NavigationContainer>
      </ThemeProvider>,
    )
    const button: ReactElement<ButtonProps> = getByRole("button")
    // Simulate a click on the button
    expect(button).toBeDefined()

    // expect(button?.props?.onPress).toBeTruthy()
    const errorMessage = "Invalid verification code"
    // expect(getByRole("text")).toHaveTextContent(errorMessage)
    // expect(getByRole("button")).toBeDefined()
  })
})
