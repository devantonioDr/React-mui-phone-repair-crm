
import { useState } from "react";
import { makeAbsoluteCopy } from "../../../../helper/makeAbsoluteCopy";
import { FormItemData } from "../RenderFormItem";
import { UseFormStateHookHelpers } from "./UseFormStateHookHelpers";


export type useFormStateInitialState = FormItemData[];




// This function is a hook that handles the state of the material-react TextFields. 
export const useFormState = (initialState: useFormStateInitialState) => {
    let [textFieldsState, setTextFieldState] = useState(initialState);

    // Gets triggered with the onFocus event.
    const handleFocus = (event: any, index: number) => {

        // makes a copy of the state value Important.
        const newState = makeAbsoluteCopy(textFieldsState);

        // Store refrence of the current input.
        const currentInput = newState[index];

        UseFormStateHookHelpers.updateFocus(currentInput, true)
        // Error is for texfields only
        if (currentInput.type == "TextField") {
            UseFormStateHookHelpers.removeError(currentInput);
        }
        setTextFieldState(newState);
    };

    // Gets triggered wit the onChange event.
    const handleChange = (event: any, index: number) => {
        // makes a copy of the state value Important.
        const newState = makeAbsoluteCopy(textFieldsState);
        // Store refrence of the current input.
        const currentInput: FormItemData = newState[index];

        if (currentInput.type == "CheckBox") {

            UseFormStateHookHelpers.toggleCheckBox(currentInput);

            UseFormStateHookHelpers.updateDependentsState(currentInput, newState);
        };
        if (currentInput.type == "TextField") {
            UseFormStateHookHelpers.removeError(currentInput);
            UseFormStateHookHelpers.updateValue(currentInput, event.target.value)
        };
        if (currentInput.type == "SelectInput") {
            UseFormStateHookHelpers.updateValue(currentInput, event.target.value);
            UseFormStateHookHelpers.updateDependentsState(currentInput, newState);
        };
        // Update the state with new value.
        setTextFieldState(newState);
    };

    // I decided to check for errors if the blur event gets triggered.
    const handleError = (event: any, index: number) => {


       
        // makes a copy of the state value Important.
        const newState = makeAbsoluteCopy(textFieldsState);

        // Store refrence of the current input.
        const currentInput = newState[index];

        UseFormStateHookHelpers.updateFocus(currentInput, false);

        const { inputProps: { value }, required } = currentInput;
        // Check if input is required and has an empty value.

        // Date picker has a null value en it is cleared off.
        if(value == null){
             // If so
             UseFormStateHookHelpers.addError(currentInput);
             // Update the state with new value.
             setTextFieldState(newState);
             return;
        }
        
        if (value && value.trim() == '' && required) {
            // If so
            UseFormStateHookHelpers.addError(currentInput);
            // Update the state with new value.
            setTextFieldState(newState);
            return;
        }
        // If no errors found then...
        UseFormStateHookHelpers.removeError(currentInput);

        // Update the state with new value.
        setTextFieldState(newState);

    };
    
    const handleClearValue = (index: number) => {
        // makes a copy of the state value Important.
        const newState = makeAbsoluteCopy(textFieldsState);

        // Store refrence of the current input.
        const currentInput = newState[index];

        // Clears the value.
        UseFormStateHookHelpers.updateValue(currentInput, "");

        // Update the state with new value.
        setTextFieldState(newState);

    };


    return {
        handleFocus,
        textFieldsState,
        setTextFieldState,
        handleChange,
        handleError,
        handleClearValue
    };
}