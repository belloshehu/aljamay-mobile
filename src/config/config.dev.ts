/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  API_URL: process.env.EXPO_PUBLIC_API_BASE_URL_DEV,
  MAX_CART_ITEM: 20, // Maximum allowable cart items
  FLUTTERWAVE_PUBLIC_KEY: process.env.EXPO_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
  FLW_SECRET_KEY: process.env.EXPO_PUBLIC_FLW_SECRET_KEY,
  APP_REMOTE_LOGO: process.env.EXPO_PUBLIC_REMOTE_APP_LOGO,
  CLOUDINARY: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY,
    apiSecret: process.env.EXPO_CLOUDINARY_API_SECRET,
  },
}
