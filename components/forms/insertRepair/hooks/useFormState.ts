
import { useState } from "react";
import { makeAbsoluteCopy } from "../../../../helper/makeAbsoluteCopy";
import { FormItemData } from "../renderFormItem";


export type useFormStateInitialState = FormItemData[];

// This function is a hook that handles the state of the material-react TextFields. 
export const useFormState = (initialState: useFormStateInitialState) => {
    let [textFieldsState, setTextFieldState] = useState(initialState);

    const handleFocus = (event: any, index: number) => {
        // makes a copy of the state value Important.
        const newState = makeAbsoluteCopy(textFieldsState);

        // Store refrence of the current input.
        const currentInput = newState[index];

        currentInput.isFocused = true;
        // Error is for texfields only
        if (currentInput.type == "TextField") {
            // Changes the helperText to a blank space so that the error text despairs.
            currentInput.inputProps.helperText = " ";
            currentInput.inputProps.error = false;
        }
        setTextFieldState(newState);
    }
    const handleChange = (event: any, index: number) => {
        // makes a copy of the state value Important.
        const newState = makeAbsoluteCopy(textFieldsState);
        // Store refrence of the current input.
        const currentInput = newState[index];

        // If input is of type checkbox.
        if (currentInput.type == "CheckBox") {
            currentInput.inputProps.checked = !currentInput.inputProps.checked;
        };

        // If input is of type TextField.
        if (currentInput.type == "TextField") {
            currentInput.inputProps.error = false;
            currentInput.inputProps.value = event.target.value;
        }
        // Update the state with new value.
        setTextFieldState(newState);
    }

    // For textfields only.
    const handleError = (event: any, index: number) => {
        // makes a copy of the state value Important.
        const newState = makeAbsoluteCopy(textFieldsState);

        // Store refrence of the current input.
        const currentInput = newState[index];

        currentInput.isFocused = false;

        const { inputProps: { value }, required, helperTextError } = currentInput;

        // Check if input is required and has an empty value.
        if (value.trim() == '' && required) {
            // If so
            currentInput.inputProps.error = true;
            currentInput.inputProps.helperText = helperTextError;

            // Update the state with new value.
            setTextFieldState(newState);
            return;
        }

        // If no errors found then...
        currentInput.inputProps.helperText = " ";
        currentInput.inputProps.error = false;
        // Update the state with new value.
        setTextFieldState(newState);

    }
    return { handleFocus, textFieldsState, setTextFieldState, handleChange, handleError };
}