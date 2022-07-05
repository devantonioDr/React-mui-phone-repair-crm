import React from "react";
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

// Hooks
import { useStepperState } from "./hooks/useStepperState";
import { useDialogState } from "./hooks/useDialogState";
import RepairForm from "./repairForm";
import ClientForm from "./clientForm";
import CostForm from "./costForm";


interface InsertRepairProps { }



const steps = [
    {
        label: 'Datos de la Reparación',
        description: '',
    },
    {
        label: 'Datos del cliente',
        description: '',
    },
    {
        label: 'Create an ad',
        description: ``,
    },
];

const BackAndForthStepperButtons = ({ handleBack, handleNext, handleFinish, index, steps,nextDisabled }: any) => {
    const isFirstStep = index === 0;
    const isLastStep = index === steps.length - 1;

    return (<Box sx={{ mb: 2,mt:3 }}>
        <div>
            <Button disabled={isFirstStep} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Atras
            </Button>
            <Button disabled={nextDisabled} variant="contained" onClick={() => isLastStep ? handleFinish() : handleNext()} sx={{ mt: 1, mr: 1 }}>
                {isLastStep ? 'Finish' : 'Siguiente'}
                <ArrowRightIcon />
            </Button>
        </div>
    </Box>);
};

export const InsertRepair = ({ }: InsertRepairProps) => {
    // Stepper state
    const { activeStep, setActiveStep, handleNext, handleBack, handleReset } = useStepperState();
    // Dialog state
    const { open: dialogOpen, handleClickOpen, handleClose } = useDialogState();

    const handleFinish = () => {
        console.log('Finished..')
    };



    return (
        <>
            <Dialog maxWidth='md' fullScreen={false} open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Agregar reparación</DialogTitle>
                <DialogContent>
                    <Box>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel>
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>
                                        {(() => {
                                            switch (index) {
                                                case 0:
                                                    return <RepairForm />
                                                case 1:
                                                    return <ClientForm />
                                                case 2:
                                                    return <CostForm />
                                                default:
                                                    return null
                                            }
                                        })()}
                                        <BackAndForthStepperButtons
                                            handleBack={handleBack}
                                            handleNext={handleNext}
                                            handleFinish={handleFinish}
                                            index={index}
                                            steps={steps}
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
