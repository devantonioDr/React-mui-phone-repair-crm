import Grid from "@mui/material/Grid";
import React from "react";
import { useFormState, useFormStateInitialState } from "./hooks/useFormState";
import RenderFormItem from "./renderFormItem";


const clientDataForm: useFormStateInitialState = [
  {
    type: "TextField",
    helperTextError: "El Nombre del cliente es requerido",
    required:true,
    inputProps: {
      error: false,
      id: "client_name",
      label: "Nombre del cliente",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
  {
    type: "TextField",
    helperTextError: "",
    inputProps: {
      error: false,
      id: "client_phone",
      label: "Numero telefónico (opcional)",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
  {
    type: "TextField",
    helperTextError: "",
    collumns: 12,
    inputProps: {
      error: false,
      id: "client_email",
      label: "Correo electronico (Opcional)",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
  {
    type: "TextField",
    helperTextError: "",
    collumns: 12,
    inputProps: {
      error: false,
      id: "client_address",
      label: "Dirección (opcional)",
      variant: "outlined",
      value: "",
      helperText: " ",
      size: "small",
    },
  },
];



interface ClientFormProps {}
export default function ClientForm(props: ClientFormProps) {
  let { textFieldsState, setTextFieldState, handleChange, handleError } =
    useFormState(clientDataForm);
  return (
    <Grid style={{ paddingTop: "20px" }} columns={12} container spacing={1}>

      {textFieldsState.map((data, index) => {
        
        return (
          <Grid key={data.inputProps.id} item xs={data.collumns || 6}>
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
