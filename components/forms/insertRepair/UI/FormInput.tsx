import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useId, useMemo, useState } from "react";
import { withContextEfficientFormInput } from "../../../../context/EfficientFormContextProvider";
import PatterDialer from "../patternDialer/patternDialer";
import ClearIcon from "@mui/icons-material/Clear";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
        <FormHelperText error>{props.errors}</FormHelperText>
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
    startAdornment: any;
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
          label={props.label}
          value={props.value || ""}
          onChange={(e) => {
            props.onChange({
              target: { name: props.name, value: String(e.target.value) },
            });
          }}
          startAdornment={props.startAdornment}
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

export const FormInputMultiSelect = withContextEfficientFormInput(
  (props: {
    errors: string[];
    label: string;
    name: string;
    onBlur: React.FocusEventHandler<any>;
    onChange: any;
    value: string;
    options: any[];
    startAdornment: any;
  }) => {
    let [values, setValues] = useState<string[]>([]);

    // useMeme hook so that we only compute the execution of this once.
    const valueDescObject = useMemo(() => {
      return props.options.reduce((acc: any, { desc, value }: any) => {
        acc[value] = desc;
        return acc;
      }, {});
    }, []);

    // Handle the change event of thes multi select input.
    const handleValuesChange = (event: any) => {
      const {
        target: { value },
      } = event;
      setValues(typeof value === "string" ? value.split(",") : value);

      // If if executing this function causes performance issues on movile devices
      // We are better off deboucing this event.
      props.onChange(event);
    };
    const handleClearValues = () => {
      setValues([]);
      props.onChange({ taget: { value: "" } });
    };

    return (
      <FormControl size="small" fullWidth>
        <InputLabel id={`${props.name}_label`}>
          {props.label}
        </InputLabel>

        <Select
          multiple
          labelId={`${props.name}_label`}
          label={props.label}
          onChange={handleValuesChange}
          renderValue={(selected: any) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip
                  key={`${props.name}_chip_${value}`}
                  label={valueDescObject[value]}
                />
              ))}
            </Box>
          )}
          // IconComponent={""}
          endAdornment={
            values.length ? (
              <InputAdornment
                style={{ cursor: "pointer" }}
                onClick={() => handleClearValues()}
                position="end"
              >
                <ClearIcon />
              </InputAdornment>
            ) : undefined
          }
          startAdornment={props.startAdornment}
        >
          {props.options?.map(({ desc, value }: any) => (
            <MenuItem
              key={`${props.name}_option_${value}`}
              value={value}
            >
              <Checkbox checked={values.indexOf(value) > -1} />
              <ListItemText primary={desc} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);

export const FormPickerInput = withContextEfficientFormInput(
  (props: {
    errors: string[];
    label: string;
    name: string;
    onBlur: React.FocusEventHandler<any>;
    onChange: any;
    value: string;
    options: any[];
    startAdornment: any;
  }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          value={props.value || null}
          onChange={(newValue: string | null) => {
            props.onChange({ target: { value: newValue } })
          }}
          renderInput={(params: any) => {
            params.InputProps.startAdornment = props.value ? (
              <InputAdornment style={{ cursor: "pointer" }} position="start">
                <ClearIcon
                  onClick={() =>
                    props.onChange({ target: { value: null } })
                  }
                />
              </InputAdornment>
            ) : (
              ""
            );
            return <TextField size="small" fullWidth {...params} />;
          }}
        />
      </LocalizationProvider>
    );
  }
);