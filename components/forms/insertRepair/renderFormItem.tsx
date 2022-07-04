import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { memo } from "react";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";

export interface FormItemData {
    type: "CheckBox" | "TextField";
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
                    style={getRamdomBackgroundColor()}
                    fullWidth={true}
                    // margin='dense'
                    onBlur={(e) => handleError(e, index)}
                    onChange={(e) => handleChange(e, index)}
                    {...data.inputProps}
                />
            );
        default:
            return null;
    }
};

export default memo(
    RenderFormItem,
    (
        prevProps: Readonly<RenderTexfieldProps>,
        nextProps: Readonly<RenderTexfieldProps>
    ) => {
        // Only rerender input when the textField has different value.
        if (nextProps.data.type == "TextField") {
            const isNotSameValue = prevProps.data.inputProps.value == nextProps.data.inputProps.value;;
            return isNotSameValue;
        }
        // Rerender checkbox only when checked value changes.
        if (nextProps.data.type == "CheckBox") {
            const checkStatusDidNotChanged = prevProps.data.inputProps.checked === nextProps.data.inputProps.checked;
            return checkStatusDidNotChanged;
        }
        // Return false to always rerender by default.
        return false
    }
);
