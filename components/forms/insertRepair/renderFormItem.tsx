import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { memo } from 'react'



export interface FormItemData {
    type: "CheckBox" | "TextField";
    helperTextError: any;
    collumns?:number;
    required?:boolean,
    inputProps: TextFieldProps | CheckboxProps | any
}

export interface RenderTexfieldProps {
    handleError: any;
    handleChange: any;
    index: number;
    data: FormItemData;
}


let RenderFormItem = ({ handleError, handleChange, index, data }: RenderTexfieldProps) => {
    let { error, value, checked } = data.inputProps;
    let { type, helperTextError } = data;
    // if (data.inputProps.error) {
    //     info.helperText = info.helperTextError;
    // } else {
    //     info.helperText = " ";
    // }
    console.log(type)
    switch (type) {
        case "CheckBox":
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={(e) => handleChange(e, index)}
                            name="gilad" />
                    }
                    label="Gilad Gray"
                />)
            break;
        case "TextField":
            return (
                <TextField
                    fullWidth={true}
                    // margin='dense'
                    onBlur={(e) => handleError(e, index)}
                    onChange={(e) => handleChange(e, index)}
                    {...data.inputProps}
                />)
        default:
            return null;
    }

}

export default RenderFormItem