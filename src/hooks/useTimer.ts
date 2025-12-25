import { useEffect, useState } from "react"

/*
 * Hook for count down or count up which can be used different scenarios such code verification form etc.
 */
interface UseTimerArgs {
  mode?: "count-down" | "count-up"
  duration: number // duration of timer in seconds
}
export const useTimer = ({ mode = "count-down", duration }: UseTimerArgs) => {
  const [time, setTime] = useState(duration)

  useEffect(() => {
    let interval = setInterval(() => {
      if (mode === "count-down") {
        if (time > 0) {
          const timeLeft = time - 1
          setTime(timeLeft)
        }
      } else {
        if (time > duration) {
          const timeLeft = time + 1
          setTime(timeLeft)
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [time])

  const getTimer = () => {
    // Returns formated timing count down or count up
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${hours}:${minutes}:${seconds}`
  }

  return { time, getTimer }
}
