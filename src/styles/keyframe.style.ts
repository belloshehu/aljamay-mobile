import { css } from "react-native-reanimated"

export const slideInKeyframe = css.keyframes({
  from: {
    transform: "translate(-100%) scale(0)",
  },
  to: {
    transform: "translate(0%) scale(1)",
  },
})

export const slideInYKeyframe = css.keyframes({
  from: {
    transform: "translateY(-100%) scale(0)",
  },
  to: {
    transform: "translateY(0%) scale(1)",
  },
})

export const slideInXKeyframe = css.keyframes({
  from: {
    transform: "translateX(-100%) scale(0)",
  },
  to: {
    transform: "translateX(0%) scale(1)",
  },
})

export const scaleKeyframe = css.keyframes({
  "0%": {
    transform: "scale(0.1)",
  },
  "25%": {
    transform: "scale(0.25)",
  },
  "50%": {
    transform: "scale(0.5)",
  },
  "75%": {
    transform: "scale(0.75)",
  },
  "100%": {
    transform: "scale(1)",
  },
})

export const glowKeyframe = css.keyframes({
  "0%, 100%": {
    boxShadow: [
      {
        blurRadius: 0,
        offsetX: 0,
        offsetY: 1,
        color: "gray",
      },
    ] as any,
  },
  "50%": {
    boxShadow: [
      {
        blurRadius: 15,
        offsetX: 3,
        offsetY: 0,
        color: "green",
      },
    ] as any,
  },
})
