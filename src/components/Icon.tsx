import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

import { useAppTheme } from "@/theme/context"

export type IconTypes = keyof typeof iconRegistry

type BaseIconProps = {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>
}

type PressableIconProps = Omit<TouchableOpacityProps, "style"> & BaseIconProps
type IconProps = Omit<ViewProps, "style"> & BaseIconProps

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity />
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {PressableIconProps} props - The props for the `PressableIcon` component.
 * @returns {JSX.Element} The rendered `PressableIcon` component.
 */
export function PressableIcon(props: PressableIconProps) {
  const {
    icon,
    color,
    size = 20,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...pressableProps
  } = props

  const { theme } = useAppTheme()

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <TouchableOpacity {...pressableProps} style={$containerStyleOverride}>
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </TouchableOpacity>
  )
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <View />, use `PressableIcon` if you want to react to input
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size = 20,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...viewProps
  } = props

  const { theme } = useAppTheme()

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <View {...viewProps} style={$containerStyleOverride}>
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </View>
  )
}

export const iconRegistry = {
  back: require("@assets/icons/back.png"),
  bell: require("@assets/icons/bell.png"),
  caretLeft: require("@assets/icons/caretLeft.png"),
  caretRight: require("@assets/icons/caretRight.png"),
  check: require("@assets/icons/check.png"),
  clap: require("@assets/icons/demo/clap.png"), // @demo remove-current-line
  community: require("@assets/icons/demo/community.png"), // @demo remove-current-line
  components: require("@assets/icons/demo/components.png"), // @demo remove-current-line
  debug: require("@assets/icons/demo/debug.png"), // @demo remove-current-line
  github: require("@assets/icons/demo/github.png"), // @demo remove-current-line
  heart: require("@assets/icons/demo/heart.png"), // @demo remove-current-line
  hidden: require("@assets/icons/hidden.png"),
  ladybug: require("@assets/icons/ladybug.png"),
  lock: require("@assets/icons/lock.png"),
  menu: require("@assets/icons/menu.png"),
  more: require("@assets/icons/more.png"),
  pin: require("@assets/icons/demo/pin.png"), // @demo remove-current-line
  podcast: require("@assets/icons/demo/podcast.png"), // @demo remove-current-line
  settings: require("@assets/icons/settings.png"),
  slack: require("@assets/icons/demo/slack.png"), // @demo remove-current-line
  view: require("@assets/icons/view.png"),
  x: require("@assets/icons/x.png"),
  search: require("@assets/icons/search.png"),
  home: require("@assets/icons/home.png"),
  cart: require("@assets/icons/cart.png"),
  user: require("@assets/icons/user.png"),
  delete: require("@assets/icons/delete.png"),
  plus: require("@assets/icons/plus.png"),
  category: require("@assets/icons/category.png"),
  message: require("@assets/icons/message.png"),
  review: require("@assets/icons/review.png"),
  order: require("@assets/icons/order.png"),
  minus: require("@assets/icons/minus.png"),
  location: require("@assets/icons/location.png"),
  tea: require("@assets/icons/tea.png"),
  spices: require("@assets/icons/spices.png"),
  bread: require("@assets/icons/bread.png"),
  camera: require("@assets/icons/camera.png"),
  promo: require("@assets/icons/promo.png"),
  edit: require("@assets/icons/edit.png"),
}

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
}
