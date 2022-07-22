import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { memo, useContext } from "react";
import { getRamdomBackgroundColor } from "../../../../helper/getRamdomColor";
import { EfficientFormContext } from "../../../../context/EfficientFormContextProvider";
import { InsertRepairContext } from "../../../../context/InsertRepairContextProvider";

const BackButton = memo(
    (props: any) => {
        const { stepperHook } = useContext(InsertRepairContext);
        return (
            <Button
                disabled={stepperHook.isFirstStep}
                onClick={stepperHook.handleBack}
                sx={{ mt: 1, mr: 1 }}
            >
                Atras
            </Button>
        );
    }
);

const NextButton = memo(
    (props: any) => {
        const { onSubmit } = useContext(EfficientFormContext);
        const { stepperHook } = useContext(InsertRepairContext);
        // OnNext for stepper.
        const onNext = () => {
            // Check if form have errors.
            let { haveErrors } = onSubmit();

            // If it has errors exit out of the function.
            if (haveErrors) return;

            // Go next if it doesn't have errors.
            stepperHook.handleNext();
        };
        return (
            <Button
                variant="contained"
                onClick={onNext}
                sx={{ mt: 1, mr: 1 }}
            >
                Siguiente
                <ArrowRightIcon />
            </Button>
        );
    }
);


export const StepperBackAndForth = () => {
    return (
        <Box sx={{ mb: 2, mt: 3 }}>
            <BackButton />
            <NextButton />
        </Box>
    );
};

