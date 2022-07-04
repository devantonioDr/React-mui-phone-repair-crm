
import { useState } from "react";
import { FormItemData } from "../renderFormItem";


export type useFormStateInitialState = FormItemData[];

// This function is a hook that handles the state of the material-react TextFields. 
export const useFormState = (initialState : useFormStateInitialState) => {
    let [textFieldsState, setTextFieldState] = useState(initialState);

    const handleChange = (event: any, index: number) => {
        const currentInput = textFieldsState[index];
        currentInput.inputProps.error= false;
        currentInput.inputProps.value = event.target.value;
        setTextFieldState(textFieldsState.slice());
    }
    const handleError = (event: any, index: number) => {
        // Store refrence of the current input.
        const currentInput = textFieldsState[index];
        
        currentInput.inputProps.error = false;
        currentInput.inputProps.color = 'success'

        const {inputProps:{value},required,helperTextError} = currentInput;
        // Check if input is required and has an empty value.
        if (value.trim() == '' && required) {
            currentInput.inputProps.error = true;
            currentInput.inputProps.helperText = helperTextError;
            setTextFieldState(textFieldsState.slice());
        }
    }
    return { textFieldsState, setTextFieldState, handleChange, handleError };
}