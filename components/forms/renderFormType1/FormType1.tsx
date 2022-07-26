import Grid from "@mui/material/Grid";
import React, { useEffect, useId } from "react";
import FormLayout, { FormLayoutItem } from "./FormLayout";
import { useFormState, useFormStateInitialState } from "./hooks/useFormState";
import RenderFormItem, { FormItemData } from "./RenderFormItem";

interface FormType1Props {
  initialState: useFormStateInitialState;
  currentFormIsSatified?: Function;
}

export default function FormType1(props: FormType1Props) {
  let {
    handleFocus,
    textFieldsState,
    setTextFieldState,
    handleChange,
    handleError,
  } = useFormState(props.initialState);

  // Provides feedback to an outter element.
  useEffect(() => {
    props?.currentFormIsSatified &&
      props?.currentFormIsSatified(textFieldsState);
    // Evaluate only if allforms are satified.
  }, [textFieldsState]);

  let id = useId();
  return (
    <FormLayout>
      {textFieldsState.map((data: FormItemData, index) => {
        const isCheckBox = data.type == "CheckBox";
        let hasToBerendered = data.renderByDefault ? true : false;
        if (data.renderByDefault == undefined) hasToBerendered = true;

        if (data.isolated) return null;

        if (!hasToBerendered) return null;
        return (
          <FormLayoutItem
            key={`${id}_${data.inputProps.id}_`}
            isCheckBox={isCheckBox}
            collumns={data.collumns || 6}
          >
            <RenderFormItem
              handleFocus={handleFocus}
              handleChange={handleChange}
              handleError={handleError}
              index={index}
              data={data}
            />
          </FormLayoutItem>
        );
      })}
    </FormLayout>
  );
}

FormType1.defaultProps = {
  initialState: [
    {
      type: "TextField",
      isFocused: false,
      helperTextError: "La marca del dispositivo es requerida",
      required: true,
      collumns: 6,
      inputProps: {
        autoComplete: "off",
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
      collumns: 6,
      inputProps: {
        autoComplete: "off",
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
      collumns: 12,
      inputProps: {
        autoComplete: "off",
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
      type: "CheckBox",
      collumns: 6,
      inputProps: {
        autoComplete: "off",
        id: "device_has_already_been_repaired",
        label: "Ya ha sido reparado?",
        size: "small",
        checked: true,
      },
    },
  ],
};
