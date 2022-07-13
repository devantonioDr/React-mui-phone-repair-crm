import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SxProps, Theme } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { memo, useEffect, useState } from "react";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";
import useDebounce from "../../../helper/useDebounce";

export interface FormItemData {
  type: "CheckBox" | "TextField" | "SelectInput";
  isolated?: boolean;
  renderByDefault?: boolean;
  id?: string;
  xs?: SxProps<Theme>;
  renderDepends?: {
    dependents: { id: string; checked?: boolean; value?: string }[];
  };
  options?: { value: string; desc: string }[];
  hasError?: boolean;
  isFocused?: boolean;
  helperTextError?: any;
  collumns?: number;
  descText?: string;
  required?: boolean;
  inputProps?: TextFieldProps | CheckboxProps | any;
}
 
export interface RenderTexfieldProps {
  handleFocus: any;
  handleError: any;
  handleChange: any;
  index: number;
  data: FormItemData;
}

const RenderFormItem = ({
  handleFocus,
  handleError,
  handleChange,
  index,
  data,
}: RenderTexfieldProps) => {
  let [currentValue, setCurrentValue] = useState(data.inputProps.value);
  const debouncedValue = useDebounce(currentValue, 1000);
  // Debounced the handleChange to prevent too many rerenders when
  // You are typing.

  useEffect(() => {
    handleChange({ target: { value: debouncedValue } }, index);
  }, [debouncedValue]);



  const debouncedHandleChange = (e: any, index: number) => {
    setCurrentValue(e.target.value);
  };

  let { type } = data;
  if (data.renderByDefault == false) return null;

  switch (type) {
    case "CheckBox":
      return (
        <FormControlLabel
          // style={getRamdomBackgroundColor()}
          control={
            <Checkbox
              xs={{ mt: 4 }}
              onChange={(e) => handleChange(e, index)}
              {...data.inputProps}
            />
          }
          label={`${data.inputProps.label}: ${
            data.inputProps.checked ? "Si" : "No"
          }`}
        />
      );
    case "TextField":
      return (
        <>
          <TextField
            // style={getRamdomBackgroundColor()}
            sx={{ ...data.xs }}
            fullWidth={true}
            // margin='dense'
            onBlur={(e) => handleError(e, index)}
            onChange={(e) => debouncedHandleChange(e, index)}
            FormHelperTextProps={{
              style: { marginTop: "-1px", marginBottom: "10px" },
            }}
            {...{ ...data.inputProps, value: currentValue }}
          />
          {data.descText && <FormHelperText>{data.descText}</FormHelperText>}
        </>
      );
    case "SelectInput":
      return (
        <FormControl
          // style={getRamdomBackgroundColor()}
          size={data.inputProps.size}
          sx={{ mt: 4, width: "100%", ...data.xs }}
          fullWidth={true}
        >
          <InputLabel id={data.inputProps.id}>
            {data.inputProps.label}
          </InputLabel>

          <Select {...data.inputProps} onChange={(e) => handleChange(e, index)}>
            {data.options &&
              data.options.map((item, index) => (
                <MenuItem key={`${item.desc}_${item.value}`} value={item.value}>
                  {item.desc}
                </MenuItem>
              ))}
          </Select>

          <FormHelperText> </FormHelperText>
        </FormControl>
      );
    default:
      return null;
  }
};

export default RenderFormItem;
