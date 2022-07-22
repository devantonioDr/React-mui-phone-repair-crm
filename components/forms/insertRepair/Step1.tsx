import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";
import {
    EfficientFormContextProvider,
    EfficientFormState,
} from "../../../context/EfficientFormContextProvider";
import {
    notEmptyValidator,
    onlyLetters,
    onlyNumbers,
} from "../../../utils/formValidators";
import {
    FormInput,
    FormInputCheckBox,
    FormInputSelect,
    FormInputUnlockPattern,
} from "./UI/FormInput";
import { Form } from "./UI/Form";
import { StepperBackAndForth } from "./UI/StepperBackAndForth";

function Step1(props: { notifyChange?: (formData: EfficientFormState, haveErrors: boolean) => void; }) {

    const [showLockMethod, setShowLockedMethod] = useState(false);
    const [lockMethodType, setLockMethodType] = useState("");

    const toggleLockMethod = useCallback((formData: EfficientFormState) => {
        // sets the lock method initial state if lock method checked.
        if (formData.data["device_has_lock_method"] == "true") {
            setShowLockedMethod(true);
            setLockMethodType("30");
            return;
        }
        // If device_has_lock_method value is not true hide lock method Select.
        setShowLockedMethod(false);
    }, []);

    const handleLockTypeChange = useCallback((formData: EfficientFormState) => {
        const lockType = formData.data["device_lock_type"];
        if (lockType) {
            setLockMethodType(lockType);
        }
    }, []);

    const notifyChange = (formData: EfficientFormState, haveErrors: boolean) => {
        props.notifyChange && props.notifyChange(formData, haveErrors);
    };

    const notifyChangeImmediately = useCallback((formData: EfficientFormState) => {
        toggleLockMethod(formData);
        handleLockTypeChange(formData);
    }, []);

    return (
        <Box sx={{ marginRight: '20px',mt:2 }}>
            <EfficientFormContextProvider notifyChange={notifyChange} notifyChangeImmediately={notifyChangeImmediately} >
                <Form>
                    <Grid container columns={12} spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <FormInput
                                label="Marca del dispositivo"
                                name="device_brand"
                                validators={[notEmptyValidator]}
                                validateAsTyping={true}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <FormInput
                                label="Modelo del dispositivo"
                                name="device_model"
                                validators={[notEmptyValidator]}
                                validateAsTyping={true}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <FormInput
                                label="Motivo de ingreso (falla)"
                                name="device_why_repaired"
                                validators={[notEmptyValidator, onlyLetters]}
                                validateAsTyping={true}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <FormInput
                                label="Color del dispositivo"
                                name="device_color"
                                validators={[notEmptyValidator, onlyLetters]}
                                validateAsTyping={true}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormInput
                                label="IMEI/ESN (opcional)"
                                name="device_serial_number"
                                validators={[onlyLetters, onlyNumbers]}
                                validateAsTyping={true}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormInput
                                label="Estado del dispositivo (opcional)"
                                name="device_state"
                                validators={[onlyLetters]}
                                validateAsTyping={true}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <FormInputCheckBox
                                label="¿Puede encender?"
                                name="device_can_turn_on"
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <FormInputCheckBox
                                label="¿Ya ha sido reparado?"
                                name="device_has_already_been_repaired"
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <FormInputCheckBox
                                label="¿Presenta humdad (esta mojado)?"
                                name="device_has_been_wet"
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <FormInputCheckBox
                                label="¿Tiene metodo de blockeo?"
                                name="device_has_lock_method"
                            />
                        </Grid>

                        {showLockMethod && (
                            <>
                                <Grid item sm={6} xs={12}>
                                    <FormInputSelect
                                        label="Tipo de desbloqueo"
                                        name="device_lock_type"
                                        defaultValue="30"
                                        options={[
                                            { value: "30", desc: "PIN" },
                                            { value: "40", desc: "Contraseña" },
                                            { value: "50", desc: "Patrón de bloqueo" },
                                        ]}
                                    />
                                </Grid>
                                {lockMethodType == "30" && (
                                    <Grid item sm={6} xs={12}>
                                        <FormInput
                                            label="PIN de desbloqueo"
                                            name="device_lock_pin"
                                            validators={[notEmptyValidator, onlyNumbers]}
                                            validateAsTyping={true}
                                        />
                                    </Grid>
                                )}
                                {lockMethodType == "40" && (
                                    <Grid item sm={6} xs={12}>
                                        <FormInput
                                            label="Contraseña de desbloqueo"
                                            name="device_lock_password"
                                            validators={[notEmptyValidator]}
                                            validateAsTyping={true}
                                        />
                                    </Grid>
                                )}
                                {lockMethodType == "50" && (
                                    <Grid item xs={12}>
                                        <FormInputUnlockPattern
                                            label=""
                                            name="device_lock_pattern"
                                            validators={[notEmptyValidator]}
                                        />
                                    </Grid>
                                )}
                            </>
                        )}
                    </Grid>
                    <StepperBackAndForth />
                </Form>
            </EfficientFormContextProvider>
        </Box>
    );
}

export default Step1;
