import Grid from "@mui/material/Grid";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import React from "react";
import { useState } from "react";

interface InsertRepairProps { }
const inputFieldsMeta: TextFieldProps | any[] = [
    {
        error: false,
        id: "device_brand",
        label: "Marca del dispositivo",
        variant: "outlined",
        value: "",
        helperText: " ",
        helperTextError: "La marca del dispositivo es requerida",
        size: "small",
    },
    {
        error: false,
        id: "device_model",
        label: "Modelo del dispositivo",
        variant: "outlined",
        value: "",
        helperText: " ",
        helperTextError: "El modelo del dispositivo es requerido",
        size: "small",
    },
    {
        error: false,
        id: "device_color",
        label: "Color del dispositivo",
        variant: "outlined",
        value: "",
        helperText: " ",
        helperTextError: "El color del dispositivo es requerido",
        size: "small",
    },
    {
        error: false,
        id: "serial_number",
        label: "IMEI/ESN (opcional)",
        variant: "outlined",
        value: "",
        helperText: " ",
        helperTextError: "",
        size: "small",
    },
    {
        error: false,
        id: "why_repaired",
        label: "Motivo de ingreso (falla)",
        variant: "outlined",
        value: "",
        helperText: " ",
        helperTextError: "El motivo de ingreso del dispositivo es requerido",
        size: "small",
        collumns:12
    },
    {
        error: false,
        id: "device_state",
        label: "Estado del dispositivo (opcional)",
        variant: "outlined",
        value: "",
        helperText: " ",
        helperTextError: "El motivo de ingreso del dispositivo es requerido",
        size: "small",
        collumns:12
    }
];

export const InsertRepair = ({ }: InsertRepairProps) => {
    let [textFieldsState, setTextFieldState] = useState(inputFieldsMeta);
    const handleChange = (event: any, index: number) => {
        textFieldsState[index].error = false;
        textFieldsState[index].value = event.target.value;
        setTextFieldState(textFieldsState.slice());
    }
    const handleBlur = (event: any, index: number) => {
        textFieldsState[index].error = false;
        textFieldsState[index].color ='success'
        if (textFieldsState[index].value.trim() == '') {
            textFieldsState[index].error = true;
            setTextFieldState(textFieldsState.slice());
        }
    }
    return (<Grid columns={12} container spacing={2}>

        {textFieldsState.map((info, index) => {
            if (info.error) {
                info.helperText = info.helperTextError;
            } else {
                info.helperText = " ";
            }
            return (
                <Grid key={info.id} item xs={info.collumns || 6}>
                    {/* <FormControl variant={info.variant} error={info.error}>
                        <InputLabel htmlFor={info.id}>{info.label}</InputLabel>
                        <Input id={info.id} aria-describedby={info.label} />
                        <FormHelperText id={info.id + '-helper-text'}>{info.helperText}</FormHelperText>
                    </FormControl> */}
                    <TextField
                        fullWidth={true}
                        // margin='dense'
                        onBlur={(e) => handleBlur(e, index)}
                        onChange={(e) => handleChange(e, index)}
                        {...info}
                    />
                </Grid>
            )
        })}
    </Grid>
    );
};
