import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { memo } from "react";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";

export interface FormItemData {
    type: "CheckBox" | "TextField";
    hasError?: boolean;
    isFocused?: boolean;
    helperTextError?: any;
    collumns?: number;
    required?: boolean;
    inputProps: TextFieldProps | CheckboxProps | any;
}

export interface RenderTexfieldProps {
    handleFocus: any;
    handleError: any;
    handleChange: any;
    index: number;
    data: FormItemData;
}

let RenderFormItem = ({
    handleFocus,
    handleError,
    handleChange,
    index,
    data,
}: RenderTexfieldProps) => {
    let { type } = data;
    console.log(data.inputProps);
    switch (type) {
        case "CheckBox":
            return (
                <FormControlLabel
                    // style={getRamdomBackgroundColor()}
                    control={
                        <Checkbox
                            onChange={(e) => handleChange(e, index)}
                            {...data.inputProps}
                        />
                    }
                    label={data.inputProps.label}
                />
            );
        case "TextField":
            return (
                <TextField
                    // style={getRamdomBackgroundColor()}
                    fullWidth={true}
                    // margin='dense'
                    onBlur={(e) => handleError(e, index)}
                    onChange={(e) => handleChange(e, index)}
                    FormHelperTextProps={{ style: { marginTop: '-1px', marginBottom: '10px' } }}
                    {...data.inputProps}
                />
            );
        default:
            return null;
    }
};

export default RenderFormItem;
