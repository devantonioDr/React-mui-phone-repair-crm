import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { useFormState, useFormStateInitialState } from "./hooks/useFormState";
import RenderFormItem from "./renderFormItem";

const clientDataForm: useFormStateInitialState = [
    {
        type: "TextField",
        helperTextError: "El Número de folio es requerido",
        required: true,
        collumns:12,
        inputProps: {
            error: false,
            id: "repair_id",
            label: "Número de folio",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        helperTextError: "",
        required: false,
        collumns:6,
        inputProps: {
            error: false,
            id: "repair_stimated_cost",
            label: "Costo estimado (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        helperTextError: "",
        required: false,
        collumns:6,
        inputProps: {
            error: false,
            id: "client_money_upfront",
            label: "Adelanto del cliente (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        helperTextError: "",
        collumns:12,
        inputProps: {
            error: false,
            id: "repair_assigned_technician",
            label: "Tecnico asignado (opcional)",
            variant: "outlined",
            value: "",
            helperText: "Incluso con tecnico asignado, los demas podran ver y modificar la reparacion. Este campo ayuda a que el tecnico pueda filtrar mejor sus reparaciones.",
            size: "small",
        },
    }
];

interface costFormProps { }

export default function CostForm(props: costFormProps) {
    let { textFieldsState, setTextFieldState, handleChange, handleError } = useFormState(clientDataForm);
    return (
        <Grid style={{ paddingTop: "20px" }} columns={12} container spacing={1}>
            {textFieldsState.map((data, index) => {
                return (
                    <Grid key={data.inputProps.id} columnSpacing={1} item xs={data.collumns || 6}>
                        <RenderFormItem
                            handleChange={handleChange}
                            handleError={handleError}
                            index={index}
                            data={data}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
}
