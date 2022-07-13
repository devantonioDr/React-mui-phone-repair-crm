import { FormItemData } from "../RenderFormItem";




export class UseFormStateHookHelpers {

    // It evaluates if all required fields are filled with values other than "".
    /**
     * param inputFieldsMetaData FormItemData[]  
     * return boolean
     */
    public static checkIfAllRequiredFieldsAreFilled(inputFieldsMetaData: FormItemData[]) {

        // Iterate through all metadata fields.
        for (let i = 0; i < inputFieldsMetaData.length; i++) {

            // Gets element by current index.
            const { required, type, inputProps, hasError } = inputFieldsMetaData[i];

            // If element has the optional attribute of required.
            if (required) {
                // If it has an error
                if (hasError) return false;

                // If element has a value and also that value is not an empty string.
                if (type == "TextField" && inputProps?.value.trim() == "") return false;

                // If element is a checkbox, it is requeried and it has not been checked.
                if (type == "CheckBox" && inputProps?.checked == false) return false;
            }
        }
        /**
         * Everything was satisfied meaning that all input 
         * fields has a value other then an empty string.
         * */
        return true;
    }

    public static HELPER_TEXT_DEFAULT = " "
    // Removes error from input field state.
    public static removeError = (currentInput: FormItemData) => {
        currentInput.inputProps.error = false;
        currentInput.inputProps.helperText = this.HELPER_TEXT_DEFAULT;
    };
    // Adds error to input field state.
    public static addError = (currentInput: FormItemData) => {
        currentInput.inputProps.error = true;
        currentInput.inputProps.helperText = currentInput.helperTextError;
    };
    // toggle checkbox state.
    public static toggleCheckBox = (currentInput: FormItemData) => {
        currentInput.inputProps.checked = !currentInput.inputProps.checked;
    };

    // Update inputState value.
    public static updateValue = (currentInput: FormItemData, newValue: string) => {
        currentInput.inputProps.value = newValue;
    };
    public static updateFocus = (currentInput: FormItemData, newValue: boolean) => {
        currentInput.isFocused = newValue;
    };
   

    // Find the indecies of the elements wich renderByDefault propery have to be updated.
    public static findDependentsIndeces = (currentInput: FormItemData, currentState: FormItemData[]) => {

        let ids = currentInput.renderDepends?.dependents;
        if (!ids || ids.length == 0) return [];
        let indeces = [];
        for (let i = 0; i < ids.length; i++) {
            const element = ids[i].id;
            let index = currentState.findIndex((item) => item.id == element);
            if (index > -1) indeces.push(index);
        }
        return indeces;
    };

    // Makes rendered dependents desapair when they need to.
    public static makeDependentsDesapair = (
        currentInput: FormItemData,
        currentState: FormItemData[]
    ) => {
        const indeces = this.findDependentsIndeces(currentInput, currentState);
        const dependents = currentInput.renderDepends?.dependents;
        if (!dependents) return;

        for (let i = 0; i < indeces.length; i++) {
            const index = indeces[i];
            const dependent = dependents[i];
            const element = currentState[index];
            // Make sure the dependents of the dependents are updated.
            element.renderByDefault = false;
            this.updateDependentsState(element, currentState);
        }
    };

    // Updates the renderByDefault to true when the whenState logic returns true.
    public static updateDependentsState = (
        currentInput: FormItemData,
        currentState: FormItemData[]
    ) => {
        const indeces = this.findDependentsIndeces(currentInput, currentState);
        const dependents = currentInput.renderDepends?.dependents;
        if (!dependents) return;

        for (let i = 0; i < indeces.length; i++) {
            const index = indeces[i];
            const dependent = dependents[i];
            const element = currentState[index];

            const condition = dependent.value &&
                dependent.value == currentInput.inputProps.value ||
                dependent.checked &&
                dependent.checked == currentInput.inputProps.checked

            if (condition) {
                element.renderByDefault = true;
                // Make sure the dependents of the dependents are updated.
                this.updateDependentsState(element, currentState);
            } else {
                // This makes dependents desapair.
                element.renderByDefault = false;
                this.makeDependentsDesapair(element, currentState);
            };
        }
    };

};

