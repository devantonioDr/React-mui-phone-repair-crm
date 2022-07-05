import { FormItemData } from "../components/forms/insertRepair/renderFormItem";

export class FromHelpers {

    // It evaluates if all required fields are filled with values other than "".
    /**
     * param inputFieldsMetaData FormItemData[]  
     * return boolean
     */
    public checkIfAllRequiredFieldsAreFilled(inputFieldsMetaData:FormItemData[]){
 
        // Iterate through all metadata fields.
        for (let i = 0; i < inputFieldsMetaData.length; i++) {

            // Gets element by current index.
            const element = inputFieldsMetaData[i];

            // If element has the optional attribute of required.
            if(element.required){

                // If element has a value and also that value is not an empty string.
                if(element.inputProps.value && 
                    element.inputProps.value.trim() == "") 
                    return false;

                // If element is a checkbox, it is requeried and it has not been checked.
                if(element.inputProps.checked && 
                    element.inputProps.checked == false) 
                    return false;

            }
        }
        /**
         * Everything was satisfied meaning that all input 
         * fields has a value other then an empty string.
         * */ 
        return true;
    }
};