import { useFormStateInitialState } from "../renderFormType1/hooks/useFormState";

export const clientDataForm: useFormStateInitialState = [
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "El Nombre del cliente es requerido",
        required: true,
        inputProps: {
            error: false,
            id: "client_name",
            label: "Nombre del cliente",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "",
        inputProps: {
            error: false,
            id: "client_phone",
            label: "Numero telefónico (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "",
        collumns: 12,
        inputProps: {
            error: false,
            id: "client_email",
            label: "Correo electronico (Opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "",
        collumns: 12,
        inputProps: {
            error: false,
            id: "client_address",
            label: "Dirección (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
];


export const costDataForm: useFormStateInitialState = [
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "El Número de folio es requerido",
        required: true,
        collumns: 12,
        inputProps: {
            error: false,
            id: "repair_id",
            label: "Número de folio",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "",
        required: false,
        collumns: 6,
        inputProps: {
            error: false,
            id: "repair_stimated_cost",
            label: "Costo estimado (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "",
        required: false,
        collumns: 6,
        inputProps: {
            error: false,
            id: "client_money_upfront",
            label: "Adelanto del cliente (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "",
        collumns: 12,
        descText:"Incluso con tecnico asignado, los demas podran ver y modificar la reparacion. Este campo ayuda a que el tecnico pueda filtrar mejor sus reparaciones.",
        inputProps: {
            error: false,
            id: "repair_assigned_technician",
            label: "Tecnico asignado (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    }
];
console.log(costDataForm.map((v)=>`
<Grid item sm={6} xs={12}>
<FormInput 
label="${v.inputProps.label}"
name="${v.inputProps.id}" 
validators={[notEmptyValidator, onlyLetters]} 
validateAsTyping={true}
/>
</Grid>`).join('\n'));

export const repairDataForm: useFormStateInitialState = [
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "La marca del dispositivo es requerida",
        required: true,
        inputProps: {
            autoComplete: 'off',
            error: false,
            id: "device_brand",
            label: "Marca del dispositivo",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "El modelo del dispositivo es requerido",
        required: true,
        inputProps: {
            autoComplete: 'off',
            error: false,
            id: "device_model",
            label: "Modelo del dispositivo",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "El color del dispositivo es requerido",
        required: true,
        inputProps: {
            autoComplete: 'off',
            error: false,
            id: "device_color",
            label: "Color del dispositivo",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "",
        inputProps: {
            autoComplete: 'off',
            error: false,
            id: "device_serial_number",
            label: "IMEI/ESN (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "El motivo de ingreso del dispositivo es requerido",
        required: true,
        collumns: 12,
        inputProps: {
            autoComplete: 'off',
            error: false,
            id: "device_why_repaired",
            label: "Motivo de ingreso (falla)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "TextField",
        isFocused: false,
        helperTextError: "",
        collumns: 12,
        inputProps: {
            autoComplete: 'off',
            error: false,
            id: "device_state",
            label: "Estado del dispositivo (opcional)",
            variant: "outlined",
            value: "",
            helperText: " ",
            size: "small",
        },
    },
    {
        type: "CheckBox",
        collumns: 6,
        inputProps: {
            autoComplete: 'off',
            id: "device_can_turn_on",
            label: "¿Puede encender?",
            size: "small",
            checked: false
        },
    },
    {
        type: "CheckBox",
        collumns: 6,
        inputProps: {
            autoComplete: 'off',
            id: "device_has_already_been_repaired",
            label: "¿Ya ha sido reparado?",
            size: "small",
            checked: false
        },
    },
    {
        type: "CheckBox",
        collumns: 6,
        inputProps: {
            autoComplete: 'off',
            id: "device_has_been_wet",
            label: "¿Presenta humdad (esta mojado)?",
            size: "small",
            checked: false
        },
    },
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
                { id:'device_lock_password', value: "40" },
                { id:'device_lock_pattern', value: "50" }
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
        collumns: 6,
        renderByDefault: false,
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
        collumns: 6,
        renderByDefault: false,
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
    },
    {
        type: "TextField",
        isolated:true,
        xs: { mt: 4 },
        collumns: 6,
        renderByDefault: false,
        id: "device_lock_pattern",
        inputProps: {
            value:"",
            id: "device_lock_pattern"
        },
    }
];

