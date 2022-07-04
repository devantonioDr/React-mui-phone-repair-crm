import React from "react";

export const useStepperState = () => {
    // Keep track of the step that is currently active.
    const [activeStep, setActiveStep] = React.useState(0);
    // Handles the transition to the nextstep.
    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // Handles the transition to the previous state.
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // Handles the reset.
    const handleReset = () => setActiveStep(0);
    return {activeStep,setActiveStep,handleNext,handleBack,handleReset}
}