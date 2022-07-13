import React, { useId } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';

// Hooks
import { FormItemData } from "../renderFormType1/RenderFormItem";
import { FromHelpers } from "../../../helper/forms";
import FormType1 from "../renderFormType1/FormType1";
import { clientDataForm, costDataForm, repairDataForm } from "./insertRepairInputsData";
import FormType1WithPattern from "./FormType1WithPattern";
import { useTheme } from "@mui/material/styles";


interface InsertRepairProps { }



const steps_initial_state: Stepper_Step[] = [
    {
        label: 'Datos de la Reparación',
        description: '',
        ready: false
    },
    {
        label: 'Datos del cliente',
        description: '',
        ready: false
    },
    {
        label: 'Create an ad',
        description: ``,
        ready: false
    },
];

const BackAndForthStepperButtons = ({ handleBack, handleNext, handleFinish, index, steps, nextDisabled, isReady }: any) => {
    const isFirstStep = index === 0;
    const isLastStep = index === steps.length - 1;


    return (<Box sx={{ mb: 2, mt: 3 }}>
        <div>
            <Button disabled={isFirstStep} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Atras
            </Button>
            {isReady && <Button disabled={nextDisabled} variant="contained" onClick={() => isLastStep ? handleFinish() : handleNext()} sx={{ mt: 1, mr: 1 }}>
                {isLastStep ? 'Finish' : 'Siguiente'}
                <ArrowRightIcon />
            </Button>}
        </div>
    </Box>);
};

export const InsertRepair = ({ }: InsertRepairProps) => {
    // Stepper state
    const step = useStepperState(steps_initial_state);

    // Dialog state
    const { open: dialogOpen, handleClickOpen, handleClose } = useDialogState();

    // make sure current step is satified
    const currentFormIsSatified = (formMetadata: FormItemData[]) => {
        let isReady = FromHelpers.checkIfAllRequiredFieldsAreFilled(formMetadata);
        // Sets isReady so that when the value is true you can proceed to the next step.
        step.actions.setReadyToCurrentStep(isReady);
        // Gather for data when you finish current step.
        isReady && step.actions.gatherAllFormData(formMetadata);
    };

    // to be handled when all steps are finished.
    const handleFinish = () => {
        console.log(step.values.formData);

    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
            <Dialog maxWidth='md' fullScreen={fullScreen} open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Agregar reparación</DialogTitle>
                <DialogContent>
                    <Box>
                        <Stepper activeStep={step.values.activeStepIndex} orientation="vertical">
                            {step.values.steps.map((current_step, index) => (
                                <Step key={current_step.label}>
                                    <StepLabel>
                                        {current_step.label}
                                    </StepLabel>
                                    <StepContent TransitionProps={{ unmountOnExit: false }}>
                                        <Typography>{current_step.description}</Typography>
                                        {(() => {
                                            switch (index) {
                                                case 0:
                                                    return <FormType1WithPattern
                                                        initialState={repairDataForm}
                                                        currentFormIsSatified={currentFormIsSatified}
                                                    />
                                                case 1:
                                                    return <FormType1
                                                        initialState={clientDataForm}
                                                        currentFormIsSatified={currentFormIsSatified}
                                                    />
                                                case 2:
                                                    return <FormType1
                                                        initialState={costDataForm}
                                                        currentFormIsSatified={currentFormIsSatified}
                                                    />
                                                default:
                                                    return null
                                            }
                                        })()}
                                        <BackAndForthStepperButtons
                                            handleBack={step.actions.handleBack}
                                            handleNext={step.actions.handleNext}
                                            handleFinish={handleFinish}
                                            index={step.values.activeStepIndex}
                                            steps={step.values.steps}
                                            isReady={step.values.isCurrentStepReady}
                                        />
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancelar </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
