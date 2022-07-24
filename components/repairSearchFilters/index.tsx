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
import {
    EfficientFormContextProvider,
    withContextEfficientFormInput,
} from "../../context/EfficientFormContextProvider";
import { FormInput, FormInputMultiSelect, FormInputSelect, FormPickerInput } from "../forms/insertRepair/UI/FormInput";






export default function SearchFilters(props: any) {
 


    const mode = useFilterResponsiveTemplate();

    return (
        <ContainerType1 Title="Filtros">
            <Grid container spacing={2}>
             

                <EfficientFormContextProvider>
                    {/* First row */}

                    <Grid item  xs={mode[0][0]}>
                        <FormInput label="Búsqueda" name="search_query" />
                    </Grid>

                    <Grid item  xs={mode[0][1]}>
                        <FormInputSelect
                            label="Ordenar por"
                            name="order_by"
                            startAdornment={
                                <InputAdornment position="start">
                                    <FormatLineSpacingIcon />
                                </InputAdornment>
                            } />
                    </Grid>

                    <Grid item  xs={mode[0][2]}>
                        <FormInputSelect label="Tipo de orden" name="order_by" startAdornment={
                            <InputAdornment position="start">
                                <SortIcon />
                            </InputAdornment>
                        } />
                    </Grid>
                    {/* SecondRow */}

                    <Grid item  xs={mode[1][0]}>
                        <FormInputMultiSelect label="Estado" name="status"  startAdornment={
                            <InputAdornment position="start">
                                <PlaylistAddIcon />
                            </InputAdornment>
                        } />
                    </Grid>

                    <Grid item  xs={mode[1][1]}>
                        <FormInputSelect label="Sucursal" name="branch_office"  startAdornment={
                            <InputAdornment position="start">
                                <StoreIcon />
                            </InputAdornment>
                        } />
                    </Grid>

                    <Grid item  xs={mode[1][2]}>
                        <FormInputSelect label="Técnico asignado" name="technician"  startAdornment={
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        } />
                    </Grid>
                    {/* Third Row */}
                    <Grid item  xs={mode[2][0]}>
                        <FormPickerInput label="Desde" name="from_date" />
                    </Grid>

                    <Grid item  xs={mode[2][1]}>
                        <FormPickerInput label="Hasta" name="to_date" />
                    </Grid>
                </EfficientFormContextProvider>
            </Grid>
        </ContainerType1>
    );
}
