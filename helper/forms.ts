import { FormItemData } from "../components/forms/insertRepair/renderFormItem";

export class FromHelpers {

    // It evaluates if all required fields are filled with values other than "".
    /**
     * param inputFieldsMetaData FormItemData[]  
     * return boolean
     */
    public static checkIfAllRequiredFieldsAreFilled(inputFieldsMetaData:FormItemData[]){
 
        // Iterate through all metadata fields.
        for (let i = 0; i < inputFieldsMetaData.length; i++) {

            // Gets element by current index.
            const {required,type,inputProps,hasError} = inputFieldsMetaData[i];

            // If element has the optional attribute of required.
            if(required){
                // If it has an error
                if(hasError) return false;

                // If element has a value and also that value is not an empty string.
                if(type =="TextField" && inputProps?.value.trim() == "") return false;

                // If element is a checkbox, it is requeried and it has not been checked.
                if(type =="CheckBox" && inputProps?.checked == false) return false;
            }
        }
        /**
         * Everything was satisfied meaning that all input 
         * fields has a value other then an empty string.
         * */ 
        return true;
    }
};