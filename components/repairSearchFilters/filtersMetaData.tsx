import { useFormStateInitialState } from "../forms/renderFormType1/hooks/useFormState";

export const filtersMetaData: useFormStateInitialState = [
  {
    type: "TextField",
    isFocused: false,
    helperTextError: "",
    required: true,
    descText: "Busca por folio, IMEI, dispositivo o cliente.",
    inputProps: {
      helperText: "Busca por folio, IMEI, dispositivo o cliente.",
      label: "Búsqueda",
      variant: "outlined",
      autoComplete: "off",
      error: false,
      id: "search_query",
      value: "",
    },
  },
  {
    type: "SelectInput",
    isFocused: false,
    helperTextError: "",
    required: true,
    inputProps: {
      label: "Ordenar por",
      variant: "outlined",
      error: false,
      id: "order_by",
      value: "",
    },
    options: [
      {
        value: "admissionDate",
        desc: "Fecha de ingreso",
      },
      {
        value: "invoiceId",
        desc: "Número de folio",
      },
    ],
  },
  {
    type: "SelectInput",
    isFocused: false,
    helperTextError: "",
    required: true,
    inputProps: {
      label: "Tipo de orden",
      variant: "outlined",
      error: false,
      id: "order_by",
      value: "",
    },
    options: [
      {
        value: "asc",
        desc: "Ascendiente",
      },
      {
        value: "desc",
        desc: "Descendiente",
      },
    ],
  },
  {
    type: "SelectInput",
    isFocused: false,
    helperTextError: "",
    required: true,
    inputProps: {
      label: "Estado",
      variant: "outlined",
      error: false,
      id: "status",
      value: "",
    },
    options: [
      {
        value: "pending",
        desc: "Pendiente",
      },
      {
        value: "in_progress",
        desc: "En proceso",
      },
      {
        value: "finished",
        desc: "Terminada",
      },
      {
        value: "in_store",
        desc: "En sucursal",
      },
      {
        value: "handed_to_client",
        desc: "Entregada al cliente",
      },
    ],
  },
  {
    type: "SelectInput",
    isFocused: false,
    helperTextError: "",
    required: true,
    inputProps: {
      label: "Sucursal",
      variant: "outlined",
      error: false,
      id: "branch_office",
      value: "",
    },
    options: [],
  },
  {
    type: "SelectInput",
    isFocused: false,
    helperTextError: "",
    required: true,
    inputProps: {
      label: "Técnico asignado",
      variant: "outlined",
      error: false,
      id: "technician",
      value: "",
    },
    options: [],
  },
  {
    type: "TextField",
    isFocused: false,

    helperTextError: "",
    required: true,
    inputProps: {
      label: "Desde",
      variant: "outlined",
      // error: false,
      id: "from_date",
      value: null,
      size: "small",
    },
  },
  {
    type: "TextField",
    isFocused: false,
    helperTextError: "",
    required: true,
    inputProps: {
      label: "Hasta",
      variant: "outlined",
      // error: false,
      id: "to_date",
      value: null,
      size: "small",
    },
  },
];

console.log(
  filtersMetaData
    .map((value) => {
      let {
        inputProps: { id, label },
      } = value;
      return `
<Grid item sm={6} xs={12}>
    <FormInput
        label="${label}"
        name="${id}"
        validators={[notEmptyValidator]}
        validateAsTyping={true}
    />
</Grid>`;
    })
    .join("\n")
);
