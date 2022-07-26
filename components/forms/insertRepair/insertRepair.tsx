import React, { memo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Hooks

import { useToggleDialog } from "../../../hooks/useToggleDialog";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { useStepperState } from "../../../hooks/useStepperState";
import Step3 from "./Step3";

interface InsertRepairProps {
  stepperHook: ReturnType<typeof useStepperState>;
  dialogHook: ReturnType<typeof useToggleDialog>;
}

export const InsertRepair = ({
  stepperHook,
  dialogHook,
}: InsertRepairProps) => {
  const onClose = () => {
    // Close insert repair dialog.
    dialogHook.toggle();
    // Reset stepper to step 1;
    stepperHook.stepperDispatch({
      kind: "SET_STEP_INDEX",
      payload: 0,
    });
  };
  return (
    <>
      <Dialog
        maxWidth="md"
        fullScreen={dialogHook.fullScreen}
        open={dialogHook.open}
        // onClose={toggle}
      >
        <DialogTitle>Agregar reparación</DialogTitle>
        <DialogContent>
          <Box>
            <Stepper activeStep={stepperHook.activeStep} orientation="vertical">
              {stepperHook.steps.map((current_step, index) => (
                <Step key={current_step.label}>
                  <StepLabel>{current_step.label}</StepLabel>
                  <StepContent TransitionProps={{ unmountOnExit: false }}>
                    <Typography>{current_step.description}</Typography>
                    {(() => {
                      switch (index) {
                        case 0:
                          return <Step1 />;
                        case 1:
                          return <Step2 />;
                        case 2:
                          return <Step3 />;
                        default:
                          return null;
                      }
                    })()}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
