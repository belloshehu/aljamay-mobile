/**
 * These are configuration settings for the production environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  API_URL: "https://aljamay.com/api",
  MAX_CART_ITEM: 20, // Maximum allowable cart items
  FLUTTERWAVE_PUBLIC_KEY: process.env.EXPO_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
  APP_REMOTE_LOGO: process.env.EXPO_PUBLIC_REMOTE_APP_LOGO,
  CLOUDINARY: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY,
    apiSecret: process.env.EXPO_CLOUDINARY_API_SECRET,
    uploadPreset: "aljamay-products",
  },
}
