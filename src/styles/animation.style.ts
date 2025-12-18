import { css } from "react-native-reanimated"
import {
  glowKeyframe,
  scaleKeyframe,
  slideInKeyframe,
  slideInXKeyframe,
  slideInYKeyframe,
} from "./keyframe.style"

export const animationStyles = css.create({
  slideInAmination: {
    animationName: slideInKeyframe,
    animationDelay: 2,
    animationTimingFunction: "ease-in-out",
    animationDuration: 500,
  },
  slideInYAmination: {
    animationName: slideInYKeyframe,
    animationDelay: 2,
    animationTimingFunction: "ease-in-out",
    animationDuration: 500,
  },
  slideInXAmination: {
    animationName: slideInXKeyframe,
    animationDelay: 2,
    animationTimingFunction: "ease-in-out",
    animationDuration: 500,
  },
  scaleAnimation: {
    animationName: scaleKeyframe,
    animationDirection: "normal",
    animationIterationCount: 1,
    animationTimingFunction: "linear",
    animationDuration: 1000,
  },
  glowAnimation: {
    animationName: glowKeyframe,
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
    animationDuration: 1200,
  },
})
