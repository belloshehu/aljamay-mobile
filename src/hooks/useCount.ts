import { useState } from "react"

interface StepHoopParams {
  defaultValue?: number
  upperLimit?: number
  lowerLimit?: number
  stepGap?: number
}

export const useStepChange = ({
  defaultValue = 0,
  lowerLimit = 0,
  stepGap = 1,
  upperLimit,
}: StepHoopParams) => {
  const [step, setStep] = useState(defaultValue)

  const stepIncrease = () => {
    if (upperLimit && step < upperLimit) {
      setStep((prev) => prev + stepGap)
    } else {
      setStep((prev) => prev + stepGap)
    }
  }

  const stepDecrease = () => {
    if (step > lowerLimit) {
      setStep((prev) => prev - stepGap)
    }
  }

  return {
    stepDecrease,
    step,
    stepIncrease,
    setStep,
    isUpperLimit: step === upperLimit,
    isLowerLimit: step === lowerLimit,
  }
}
