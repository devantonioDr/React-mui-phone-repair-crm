import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import {
    EfficientFormContextProvider,
    EfficientFormState,
} from "../../../context/EfficientFormContextProvider";
import {
    notEmptyValidator,
    onlyLetters
} from "../../../utils/formValidators";
import {FormInput} from "./UI/FormInput";
import { Form } from "./UI/Form";
import { StepperBackAndForth } from "./UI/StepperBackAndForth";

function Step2(props: { notifyChange?: (formData: EfficientFormState, haveErrors: boolean) => void; }) {

  
    const notifyChange = (formData: EfficientFormState, haveErrors: boolean) => {
        props.notifyChange && props.notifyChange(formData, haveErrors);
    };

    return (
        <Box sx={{ marginRight: '20px',mt:2 }}>
            <EfficientFormContextProvider notifyChange={notifyChange} >
                <Form>
                    <Grid  container columns={12} spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <FormInput
                                label="Nombre del cliente"
                                name="client_name"
                                validators={[notEmptyValidator, onlyLetters]}
                                validateAsTyping={true}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <FormInput
                                label="Numero telefónico (opcional)"
                                name="client_phone"
                            />
                        </Grid>

                        <Grid item  xs={12}>
                            <FormInput
                                label="Correo electronico (Opcional)"
                                name="client_email"
                            />
                        </Grid>

                        <Grid item  xs={12}>
                            <FormInput
                                label="Dirección (opcional)"
                                name="client_address"
                            />
                        </Grid>
                    </Grid>
                    <StepperBackAndForth />
                </Form>
            </EfficientFormContextProvider>
        </Box>
    );
}

export default Step2;
