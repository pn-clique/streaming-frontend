
import { useState } from "react"

export function suggestGameHook(steps) {

  const [currentStep, setCurrentSte] = useState(0)

  function changeStep(index, event) {
    if(event) event.preventDefault();

    if(index < 0 || index >= steps.length) return

    setCurrentSte(index);
  }

  return {
    currentStep,
    currentComponents: steps[currentStep],
    changeStep,
    isFirstStep: currentStep === 0 ? true : false,
    isLastStep: currentStep + 1 === steps.length ? true : false,
    setCurrentSte
  }
  
}