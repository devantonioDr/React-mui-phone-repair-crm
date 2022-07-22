import React, { useEffect, useMemo, useState } from "react";

// Mui react components
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";


import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Form  Initial state.
import { filtersMetaData } from "./filtersMetaData";

// Hooks
import { useFormState } from "../forms/renderFormType1/hooks/useFormState";

// Icons
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import SortIcon from "@mui/icons-material/Sort";
import StoreIcon from "@mui/icons-material/Store";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ClearIcon from "@mui/icons-material/Clear";
import PersonIcon from "@mui/icons-material/Person";
import { getRamdomBackgroundColor } from "../../helper/getRamdomColor";
import { INPUT_DEBUG_MODE } from "../../react_testing_variables";
import ContainerType1 from "../containerType1";

import { useFilterResponsiveTemplate } from "./hooks/useFilterResponsiveTemplate";

const CustomSelectInput = ({
    handleChange,
    data,
    index,
    startAdornment,
}: any) => {
    return (
        <FormControl size="small" fullWidth>
            <InputLabel id={`${data.inputProps.id}_label`}>
                {data.inputProps.label}
            </InputLabel>

            <Select
                style={INPUT_DEBUG_MODE ? getRamdomBackgroundColor() : {}}
                labelId={`${data.inputProps.id}_label`}
                {...data.inputProps}
                onChange={(e) => handleChange(e, index)}
                startAdornment={startAdornment}
            >
                {data.options?.map(({ desc, value }: any) => (
                    <MenuItem key={`${data.inputProps.id}_option_${value}`} value={value}>
                        {desc}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const CustomMultiSelectInput = ({
    handleChange,
    data,
    index,
    startAdornment,
    handleClearValue,
}: any) => {
    let [values, setValues] = useState<string[]>([]);

    // useMeme hook so that we only compute the execution of this once.
    const valueDescObject = useMemo(() => {
        return data.options.reduce((acc: any, { desc, value }: any) => {
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
        handleChange(event, index);
    };
    const handleClearValues = (event: any) => {
        setValues([]);
        handleClearValue(index);
    };

    data.inputProps.value = values;
    return (
        <FormControl size="small" fullWidth>
            <InputLabel id={`${data.inputProps.id}_label`}>
                {data.inputProps.label}
            </InputLabel>

            <Select
                multiple
                labelId={`${data.inputProps.id}_label`}
                {...data.inputProps}
                onChange={handleValuesChange}
                renderValue={(selected: any) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value: string) => (
                            <Chip
                                key={`${data.inputProps.id}_chip_${value}`}
                                label={valueDescObject[value]}
                            />
                        ))}
                    </Box>
                )}
                IconComponent={""}
                endAdornment={
                    values.length ? (
                        <InputAdornment
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClearValues(index)}
                            position="end"
                        >
                            <ClearIcon />
                        </InputAdornment>
                    ) : undefined
                }
                startAdornment={startAdornment}
            >
                {data.options?.map(({ desc, value }: any) => (
                    <MenuItem key={`${data.inputProps.id}_option_${value}`} value={value}>
                        <Checkbox checked={values.indexOf(value) > -1} />
                        <ListItemText primary={desc} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const CustomDatePickerInput = ({
    handleChange,
    data,
    index,
    handleError,
}: any) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker

                {...data.inputProps}
                minDate={new Date("2017-01-01")}
                onChange={(newValue: string) => {
                    debugger
                    handleChange({ target: { value: newValue } }, index);
                }}
                renderInput={(params: any) => {
                    params.InputProps.startAdornment = (

                        data.inputProps.value ?
                            <InputAdornment style={{ cursor: "pointer" }} position="start">
                                <ClearIcon onClick={() => handleChange({ target: { value: null } }, index)} />
                            </InputAdornment> : ""
                    );
                    return <TextField size="small" fullWidth  {...params} />;
                }}
            />
        </LocalizationProvider>
    );
};


export default function SearchFilters(props: any) {
    // For handling the state of the form.
    let {
        handleFocus,
        textFieldsState,
        setTextFieldState,
        handleChange,
        handleError,
        handleClearValue,
    } = useFormState(filtersMetaData);

    // Provides feedback to an outter element.
    useEffect(() => {
        props?.currentFormIsSatified &&
            props?.currentFormIsSatified(textFieldsState);
        // Evaluate only if allforms are satified.
    }, [textFieldsState]);


    const mode = useFilterResponsiveTemplate();

    return (
        <ContainerType1 Title="Filtros" >
            <Grid container spacing={2}>
                {/* First row */}
                <Grid item xs={mode[0][0]}>
                    {/* Search filter. */}
                    <TextField
                        {...textFieldsState[0].inputProps}
                        fullWidth={true}
                        onChange={(e) => handleChange(e, 0)}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button size="small" variant="contained">
                                        <SearchOutlinedIcon />
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={mode[0][1]}>
                    {/* Order by filter */}
                    <CustomSelectInput
                        handleChange={handleChange}
                        data={textFieldsState[1]}
                        index={1}
                        startAdornment={
                            <InputAdornment position="start">
                                <FormatLineSpacingIcon />
                            </InputAdornment>
                        }
                    />
                </Grid>
                <Grid item xs={mode[0][2]}>
                    {/* Order Type Asc or Desc filter */}
                    <CustomSelectInput
                        handleChange={handleChange}
                        data={textFieldsState[2]}
                        index={2}
                        startAdornment={
                            <InputAdornment position="start">
                                <SortIcon />
                            </InputAdornment>
                        }
                    />
                </Grid>
                {/* SecondRow */}
                <Grid item xs={mode[1][0]}>
                    {/* Status filter  */}
                    <CustomMultiSelectInput
                        handleChange={handleChange}
                        data={textFieldsState[3]}
                        index={3}
                        handleClearValue={handleClearValue}
                        startAdornment={
                            <InputAdornment position="start">
                                <PlaylistAddIcon />
                            </InputAdornment>
                        }
                    />
                </Grid>
                <Grid item xs={mode[1][1]}>
                    {/* Branch office  */}
                    <CustomSelectInput
                        handleChange={handleChange}
                        data={textFieldsState[4]}
                        index={4}
                        startAdornment={
                            <InputAdornment position="start">
                                <StoreIcon />
                            </InputAdornment>
                        }
                    />
                </Grid>
                <Grid item xs={mode[1][2]}>
                    {/* Assigned Tecnitian  */}
                    <CustomSelectInput
                        handleChange={handleChange}
                        data={textFieldsState[5]}
                        index={5}
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        }
                    />
                </Grid>
                {/* Third Row */}
                <Grid item xs={mode[2][0]}>
                    <CustomDatePickerInput
                        handleChange={handleChange}
                        data={textFieldsState[6]}
                        index={6}
                        handleError={handleError}
                    />
                </Grid>
                <Grid item xs={mode[2][1]}>
                    <CustomDatePickerInput
                        handleChange={handleChange}
                        data={textFieldsState[7]}
                        index={7}
                        handleError={handleError}
                    />
                </Grid>
            </Grid>
        </ContainerType1>
    );
};
