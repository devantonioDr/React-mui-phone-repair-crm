import { createContext, memo, useContext } from "react";
import { InsertRepair } from "../components/forms/insertRepair/insertRepair";
import { stepsType, useStepperState } from "../hooks/useStepperState";
import { useToggleDialog } from "../hooks/useToggleDialog";
import { EfficientFormContext } from "./EfficientFormContextProvider";

const steps_initial_state: stepsType[] = [
  {
    label: "Datos de la Reparación",
    description: "",
    ready: false,
  },
  {
    label: "Datos del cliente",
    description: "",
    ready: false,
  },
  {
    label: "Folio del servicio, costos",
    description: `Folio del servicio, costos`,
    ready: false,
  },
];

interface InsertRepairContextValue {
  stepperHook: ReturnType<typeof useStepperState>;
  dialogHook: ReturnType<typeof useToggleDialog>;
}

export const InsertRepairContext = createContext<InsertRepairContextValue>(
  {} as InsertRepairContextValue
);

export const InsertRepairContextProvider = (props: any) => {
  // Mui Stepper hook.
  const stepperHook = useStepperState(steps_initial_state);

  // Mui Dialog hook.
  const dialogHook = useToggleDialog();

  // To make the dialog full screen on mobile devices.

  const contextValue: InsertRepairContextValue = {
    stepperHook,
    dialogHook,
  };
  return (
    <>
      <InsertRepairContext.Provider value={contextValue}>
        <InsertRepair stepperHook={stepperHook} dialogHook={dialogHook} />

        {props.children}
      </InsertRepairContext.Provider>
    </>
  );
};
