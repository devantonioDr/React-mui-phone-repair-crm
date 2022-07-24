import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useId, useState } from "react";
import { withContextEfficientFormInput } from "../../../../context/EfficientFormContextProvider";
import PatterDialer from "../patternDialer/patternDialer";

// Higher order component to reduce boiler plate.
export const FormInput = withContextEfficientFormInput(
  (props: {
    errors: string[];
    label: string;
    name: string;
    onBlur: React.FocusEventHandler<any>;
    onChange: React.ChangeEventHandler<any>;
    value: string;
  }) => {
    const hasErrors = props.errors?.length > 0;

    return (
      <TextField
        error={hasErrors}
        onChange={props.onChange}
        onBlur={props.onBlur}
        variant="outlined"
        label={props.label}
        name={props.name}
        value={props.value}
        fullWidth
        size="small"
        autoComplete="false"
        helperText={" " + props?.errors}
        FormHelperTextProps={{ sx: { mt: "-2px", fontSize: "12px" } }}
      />
    );
  }
);

export const FormInputCheckBox = withContextEfficientFormInput(
  (props: {
    errors: string[];
    label: string;
    name: string;
    onBlur: React.FocusEventHandler<any>;
    onChange: any;
    value: string;
  }) => {
    const isChecked = props.value == "true" ? true : false;
    
    return (
      <FormControlLabel
        // style={getRamdomBackgroundColor()}
        control={
          <Checkbox
            checked={isChecked}
            onChange={(e) => {
              props.onChange({
                target: {
                  name: props.name,
                  value: String(e.target.checked),
                },
              });
            }}
          />
        }
        label={`${props.label}`}
      />
    );
  }
);

export const FormInputUnlockPattern = withContextEfficientFormInput(
  (props: {
    errors: string[];
    label: string;
    name: string;
    onBlur: React.FocusEventHandler<any>;
    onChange: any;
    value: string;
  }) => {
    return (
      <>
        <FormHelperText  error>{props.errors}</FormHelperText>
        <PatterDialer
          valueNotifier={(value: string) => {
            props.onChange({ target: { value } });
          }}
        />
      </>
    );
  }
);

export const FormInputSelect = withContextEfficientFormInput(
  (props: {
    errors: string[];
    label: string;
    name: string;
    onBlur: React.FocusEventHandler<any>;
    onChange: any;
    value: string;
    options: any[];
  }) => {
    const id = useId();
    return (
      <FormControl
        // style={getRamdomBackgroundColor()}
        size={"small"}
        sx={{ width: "100%" }}
        fullWidth={true}
      >
        <InputLabel id={id}>{props.label}</InputLabel>

        <Select
          value={props.value || ""}
          onChange={(e) => {
            props.onChange({
              target: { name: props.name, value: String(e.target.value) },
            });
          }}
        >
          {props.options &&
            props.options.map((item, index) => (
              <MenuItem
                key={`${item.desc}_${item.value}_${id}`}
                value={item.value}
              >
                {item.desc}
              </MenuItem>
            ))}
        </Select>

        <FormHelperText> </FormHelperText>
      </FormControl>
    );
  }
);
