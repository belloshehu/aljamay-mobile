import * as z from "zod"

// Validation schema for login
export const loginValidationSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8).max(16),
})

//validation schema for signup
export const signupValidationSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not exceed 16 characters")
      .refine((val) => /[a-z]/.test(val), {
        message: "Must include a lowercase letter",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must include an uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Must include a number",
      })
      .refine((val) => /[!@#$%^&*]/.test(val), {
        message: "Must include a special character",
      }),
    passwordRepeat: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must not exceed 16 characters")
      .refine((val) => /[a-z]/.test(val), {
        message: "Must include a lowercase letter",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must include an uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Must include a number",
      })
      .refine((val) => /[!@#$%^&*]/.test(val), {
        message: "Must include a special character",
      }),
    // privacyAccepted: z.boolean().refine((val) => val === true, {
    //   message: "You must accept the privacy policy",
    // }),
    marketingAccepted: z.boolean().optional().default(true),
  })
  .refine(
    (data) => {
      return data.password === data.passwordRepeat
    },
    {
      message: "Passwords do not match",
      path: ["passwordRepeat"],
    },
  )

export const emailVerificationValidationSchema = z.object({
  email: z.email("Invalid email address"),
})

export const resetPasswordRequestValidationSchema = z.object({
  email: z.email("Invalid email address"),
})

//validation schema for password reset form
export const resetPasswordValidationSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        "Password must contain atleat: 1 lower case, 1 upper case, 1 special character ",
      )

      .min(8)
      .max(16),
    passwordRepeat: z
      .string()
      .regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
        "Password must contain atleat: 1 lower case, 1 upper case, 1 special character ",
      )
      .min(8)
      .max(16),
  })
  .refine(
    (data) => {
      return data.password === data.passwordRepeat
    },
    {
      message: "Passwords do not match",
      path: ["passwordRepeat"],
    },
  )

// Type annotation for the auth schema
export type SignupSchemaType = z.infer<typeof signupValidationSchema>
export type LoginSchemaType = z.infer<typeof loginValidationSchema>
export type EmailVerificationSchemaType = z.infer<typeof emailVerificationValidationSchema>
export type ResetPasswordRequestSchemaType = z.infer<typeof resetPasswordRequestValidationSchema>
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordValidationSchema>
