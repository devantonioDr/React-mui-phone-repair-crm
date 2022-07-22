import { useCallback, useReducer } from "react";

export type stepsType = {
    label: string;
    description: string;
    ready: boolean;
};

type StepperStateType = {
    activeStep: number;
    steps: stepsType[];
};

// Reducers actions.
interface GO_OUTOFBOUNDS {
    kind: "GO_OUTOFBOUNDS";
}
interface GO_NEXT {
    kind: "GO_NEXT";
}
interface SET_STEP_INDEX {
    kind: "SET_STEP_INDEX";
    payload: number;
}
interface GO_PREVIOUS {
    kind: "GO_PREVIOUS";
}
interface SET_READY {
    kind: "SET_READY";
    payload: boolean;
    index: number;
}

type StepperReducerActionType =
    | GO_NEXT
    | GO_PREVIOUS
    | SET_READY
    | GO_OUTOFBOUNDS
    | SET_STEP_INDEX;




const stepperReducer = (
    state: StepperStateType,
    action: StepperReducerActionType
): StepperStateType => {
    switch (action.kind) {
        case "GO_OUTOFBOUNDS":
            return { ...state, activeStep: state.steps.length };
        case "SET_STEP_INDEX":
            return { ...state, activeStep: action.payload };
        // case "GO_NEXT":
        //   return { ...state, activeStep: state.activeStep + 1 };
        // case "GO_PREVIOUS":
        //   return { ...state, activeStep: action.payload - 1 };
        case "SET_READY":

            const index = action.index;
            return {
                ...state,
                steps: [
                    ...state.steps.slice(0, index),
                    {
                        ...state.steps[index],
                        ready: action.payload
                    },
                    ...state.steps.slice(index + 1)
                ]
            };

        default:
            return state;
    }
};

export const useStepperState = (
    steps_initial_state: stepsType[],
    trasitionDelay: number = 600
) => {

    const initialState: StepperStateType = {
        activeStep: 0,
        steps: steps_initial_state || [],
    };

    // Reducer for handling the Stepper state.
    const [{ activeStep, steps }, dispatch] = useReducer(stepperReducer, initialState);


    // Go to next step.
    const handleNext = useCallback(() => {
     
        // Store the previous state.
        const prev = activeStep;

        // Set a step that doesn't exist so that everything is closed.
        dispatch({ kind: "GO_OUTOFBOUNDS" });

        // Set next state so that the next step comes in.
        setTimeout(() => {
            dispatch({ kind: "SET_STEP_INDEX", payload: prev + 1 });
        }, trasitionDelay);


    }, [activeStep]);

    // Go to previous step.
    const handleBack = useCallback(() => {
        // Store the previous state.
        const prev = activeStep;

        // Set a step that doesn't exist so that everything is closed.
        dispatch({ kind: "GO_OUTOFBOUNDS" });

        // Set next state so that the next step comes in.
        setTimeout(() => {
            dispatch({ kind: "SET_STEP_INDEX", payload: prev - 1 });
        }, trasitionDelay);

    }, [activeStep]);

    // Sets the current step readyness.
    function setReadyToCurrentStep(this: any, isReady: boolean) {
        // Makes sure the action is not being trigger to an out of range index.
        if (activeStep < steps.length) {
            dispatch({ kind: "SET_READY", index: activeStep, payload: isReady });
        }
    }

    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === steps.length - 1;
    const isReady = steps[activeStep]?.ready;

    return {
        steps,
        isReady,
        isFirstStep,
        isLastStep,
        activeStep,
        handleNext,
        handleBack,
        setReadyToCurrentStep,
    };
};