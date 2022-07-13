import { FormItemData } from "../RenderFormItem";
import { UseFormStateHookHelpers } from "./UseFormStateHookHelpers";

const dummyStateWithCheckBoxes: FormItemData[] = [{
    type: "CheckBox",
    collumns: 6,
    inputProps: {
        autoComplete: 'off',
        id: "device_has_lock_method",
        label: "¿Tiene metodo de blockeo?",
        size: "small",
        checked: false
    }
},
{
    type: "CheckBox",
    collumns: 6,
    renderByDefault: false,
    id: "device_has_lock_method2",
    inputProps: {
        autoComplete: 'off',
        id: "device_has_lock_method2",
        label: "¿Tiene metodo de blockeo?",
        size: "small",
        checked: false
    },
}]

const dummyStateWithInputFields: FormItemData[] = [
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "",
        inputProps: {
            autoComplete: 'off',
            error: false,
            id: "serial_number",
            label: "IMEI/ESN (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    }
]

const dummyStateWithInputFieldsAndSelects: FormItemData[] = [
    {
        type: "CheckBox",
        collumns: 6,
        renderDepends: {
            dependents: [
                { id: 'device_lock_type', checked: true },
            ]
        },
        inputProps: {
            autoComplete: 'off',
            id: "device_has_lock_method",
            label: "¿Tiene metodo de blockeo?",
            size: "small",
            checked: false
        }
    },
    {
        type: "SelectInput",
        collumns: 6,
        xs: { mt: 4 },
        renderByDefault: false,
        id: "device_lock_type",
        renderDepends: {
            dependents: [
                { id: 'device_lock_pin', value: "30" },
                { id: 'device_lock_password', value: "40" }
            ]
        },
        inputProps: {
            labelId: "lock_type_label",
            id: "device_lock_type",
            value: "30",
            label: "Tipo de desbloqueo",
            size: "small",
        },
        options: [
            { value: "30", desc: "PIN" },
            { value: "40", desc: "Contraseña" },
            { value: "50", desc: "Patrón de bloqueo" },
        ]
    },
    {
        type: "TextField",
        isFocused: false,
        xs: { mt: 4 },
        helperTextError: "",
        renderByDefault: false,
        collumns: 6,
        id: "device_lock_pin",
        inputProps: {
            autoComplete: 'off',
            error: false,
            id: "device_lock_pin",
            label: "PIN de desbloqueo",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        xs: { mt: 4 },
        helperTextError: "",
        renderByDefault: false,
        collumns: 6,
        id: "device_lock_password",
        inputProps: {
            autoComplete: 'off',
            error: false,
            id: "device_lock_password",
            label: "Contraseña de desbloqueo",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    }
]


describe("make sure all useFormHelpers work", () => {

    it('Should add error to input state', () => {
        const current = dummyStateWithInputFields[0];
        UseFormStateHookHelpers.addError(current);
        expect(current.inputProps.error).toBe(true);
    });

    it('Should removeError from input state', () => {
        const current = dummyStateWithInputFields[0];
        UseFormStateHookHelpers.removeError(current);
        expect(current.inputProps.error).toBe(false);
    });


    it("Should toggle checkbox checked state true=>false || false=>true", () => {
        const current = dummyStateWithCheckBoxes[0];
        current.inputProps.checked = true;
        UseFormStateHookHelpers.toggleCheckBox(current);
        expect(current.inputProps.checked).toBe(false);
    });

    it("Should change the value of an input", () => {
        let newValue = "this is the new value.....";
        const current = dummyStateWithInputFields[0];
        UseFormStateHookHelpers.updateValue(current, newValue);
        expect(current.inputProps.value).toBe(newValue);
    });

    it("Should change the isFocus state of an input", () => {
        const current = dummyStateWithInputFields[0];
        UseFormStateHookHelpers.updateFocus(current, true);
        expect(current.isFocused).toBe(true);
    });

    it("Should find the indeces of the dependents inputs", () => {

        // When it doesn't have dependents.
        const current = dummyStateWithCheckBoxes[0];
        const indeces = UseFormStateHookHelpers.findDependentsIndeces(current, dummyStateWithInputFields);
        expect(indeces).toEqual([]);

        // Add device_has_lock_method2 dependent.
        current.renderDepends = {
            dependents: [{ id: 'device_has_lock_method2' }],
        }
        // Must return the index of the dependent.
        const indeces2 = UseFormStateHookHelpers.findDependentsIndeces(current, dummyStateWithCheckBoxes);
        expect(indeces2).toEqual([1]);
    });

    it("Should update the renderByDefault of all dependent elements", () => {


        let current = dummyStateWithInputFieldsAndSelects[0];
        current.inputProps.checked = true;

        const dependent1 = dummyStateWithInputFieldsAndSelects[1];
        const dependent2 = dummyStateWithInputFieldsAndSelects[2];
        //When checked is changed to true then we update the dependents  renderByDefault = true.
        UseFormStateHookHelpers.updateDependentsState(current, dummyStateWithInputFieldsAndSelects);
        expect(dependent1.renderByDefault).toBe(true);
        expect(dependent2.renderByDefault).toBe(true);


        
        //When Select input is changed to value "30"
        dependent1.inputProps.value="30";
        dependent2.renderByDefault = false;
        UseFormStateHookHelpers.updateDependentsState(current, dummyStateWithInputFieldsAndSelects);
        expect(dependent2.renderByDefault).toBe(true);

        // When Select input changes its value to "40"
        const dependent3 = dummyStateWithInputFieldsAndSelects[2];
        dependent3.renderByDefault = false;
        current.inputProps.value="40";
        UseFormStateHookHelpers.updateDependentsState(current, dummyStateWithInputFieldsAndSelects);
        expect(dependent3.renderByDefault).toBe(true);


        // When select input desapair all of its dependents should desapair as well.
        

    });

});
export { }