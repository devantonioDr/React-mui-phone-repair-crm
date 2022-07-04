import Grid from "@mui/material/Grid";
import React from "react";
import { useFormState, useFormStateInitialState } from "./hooks/useFormState";
import RenderFormItem from "./renderFormItem";

const repairDataForm: useFormStateInitialState = [
  {
    type: "TextField",
    isFocused: false,
    helperTextError: "La marca del dispositivo es requerida",
    required: true,
    inputProps: {
      error: false,
      id: "device_brand",
      label: "Marca del dispositivo",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
  {
    type: "TextField",
    isFocused: false,
    helperTextError: "El modelo del dispositivo es requerido",
    required: true,
    inputProps: {
      error: false,
      id: "device_model",
      label: "Modelo del dispositivo",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
  {
    type: "TextField",
    isFocused: false,
    helperTextError: "El color del dispositivo es requerido",
    required: true,
    inputProps: {
      error: false,
      id: "device_color",
      label: "Color del dispositivo",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
  {
    type: "TextField",
    isFocused: false,
    helperTextError: "",
    inputProps: {
      error: false,
      id: "serial_number",
      label: "IMEI/ESN (opcional)",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
  {
    type: "TextField",
    isFocused: false,
    helperTextError: "El motivo de ingreso del dispositivo es requerido",
    required: true,
    collumns: 12,
    inputProps: {
      error: false,
      id: "why_repaired",
      label: "Motivo de ingreso (falla)",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
  {
    type: "TextField",
    isFocused: false,
    helperTextError: "",
    collumns: 12,
    inputProps: {
      error: false,
      id: "device_state",
      label: "Estado del dispositivo (opcional)",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
];
interface repairFormProps { }
export default function RepairForm(props: repairFormProps) {
  let { textFieldsState, setTextFieldState, handleChange, handleError } = useFormState(repairDataForm);
  return (
    <Grid style={{ paddingTop: "20px" }} columnSpacing={1} columns={12} container spacing={3}>
      {textFieldsState.map((data, index) => {

        return (
          <Grid key={data.inputProps.id} style={{ paddingTop: '0px' }} item xs={data.collumns || 6}>
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
