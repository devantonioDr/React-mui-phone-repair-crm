import { FormItemData } from "../components/forms/renderFormType1/RenderFormItem";
import { FromHelpers } from "../helper/forms";


describe('Makes sure FromHelpers.checkIfAllRequiredFieldsAreFilled works', () => {
    let testInput: FormItemData[] = [
        {
            type: "TextField",
            required: true,
            hasError: true,
            inputProps: {
                value: "",
            },
        },
        {
            type: "CheckBox",
            required: true,
            hasError: true,
            inputProps: {
                value: "",
            },
        }
    ];

    it("With errors", () => {
        let result = FromHelpers.checkIfAllRequiredFieldsAreFilled(testInput);
        expect(result).toBe(false);
    });

    it("With no errors", () => {
        testInput[0].inputProps.value = "Filled with data..."
        testInput[0].hasError = false;
        testInput[1].inputProps.value = "Filled with data 2..."
        testInput[1].hasError = false;
        let result2 = FromHelpers.checkIfAllRequiredFieldsAreFilled(testInput);
        expect(result2).toBe(true);
    });



    it("With one satified and another with an error.", () => {
        testInput[0].inputProps.value = "Filled with data..."
        testInput[0].hasError = false;
        testInput[1].inputProps.value = "Filled with data..."
        testInput[1].hasError = true;
        let result3 = FromHelpers.checkIfAllRequiredFieldsAreFilled(testInput);
        expect(result3).toBe(false);
    });

});

export { }