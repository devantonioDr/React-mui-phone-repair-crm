import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ContainerType1 from "../containerType1";
import { RepairsTableHeader } from "./Header";
import { RepairsTableRow } from "./TableRow";
import { useTableState } from "./hooks/useTableState";
import useRepairListResponsiveRow from "./hooks/useResponsiveRow";



// Types
export interface RowData {
    id: number;
    folio: number;
    imei: string;
    admissionDate: string;
    brand: string;
    model: string;
    client: string;
    status: 300 | 400 | 500 | 600;
    businessBranch: string;
}

// Modular Components


// Modular Components


function RepairsTableOptionsForSelected() {
    let lables = [
        "",
        "Folio",
        "IMEI",
        "Fecha de ingreso",
        "marca",
        "modelo",
        "Cliente",
        "Estado",
        "Sucursal",
    ];
    return (
        <Box sx={{ ml: "13px", mb: 2 }}>
            <Button size="small" variant="contained" sx={{ mr: "20px" }}>
                <PlaylistAddIcon fontSize="small" sx={{ mr: "10px" }} />
                MODIFICAR ESTADO
            </Button>
            <Button size="small" color={"error"} variant="outlined">
                <DeleteIcon fontSize="small" sx={{ mr: "10px" }} />
                Eliminar
            </Button>
        </Box>
    );
}

// Hooks


export default function RepairsTable({
    initilState,
}: {
    initilState: RowData[];
}) {
    let tableState = useTableState(initilState);

    const mode = useRepairListResponsiveRow();

    return (
        <ContainerType1 Title="Listado de reparaciones">
            <RepairsTableOptionsForSelected />

            <TableContainer >
                <Table
                    sx={{ minWidth: 3, padding: "0px 16px 0px 16px" }}
                    aria-labelledby="tableTitle"
                    size={"small"}
                >
                    <RepairsTableHeader mode={mode} />
                    <TableBody>
                        {tableState.values.rows.map((data, index) => {
                            return (
                                <RepairsTableRow
                                    key={`${data.id}_repair_row_${index}`}
                                    data={data}
                                    mode={mode}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </ContainerType1>
    );
}
RepairsTable.defaultProps = {
    initilState: [
        {
            id: 1,
            folio: 2,
            imei: "",
            admissionDate: "12/07/2022",
            brand: "Xiomi",
            model: "Redmi note 8",
            client: "Jose andres jimenez",
            status: 500,
            businessBranch: "Principal",
        },
        {
            id: 1,
            folio: 3,
            imei: "",
            admissionDate: "11/07/2022",
            brand: "Samsung",
            model: "Galaxy s8",
            client: "Carlos",
            status: 300,
            businessBranch: "Principal",
        },
        {
            id: 1,
            folio: 4,
            imei: "",
            admissionDate: "10/07/2022",
            brand: "Alcatel",
            model: "a50",
            client: "Jose miguel",
            status: 400,
            businessBranch: "Principal",
        },
        {
            id: 1,
            folio: 2,
            imei: "",
            admissionDate: "12/07/2022",
            brand: "Xiomi",
            model: "Redmi note 8",
            client: "Jose andres jimenez",
            status: 500,
            businessBranch: "Principal",
        },
        {
            id: 1,
            folio: 3,
            imei: "",
            admissionDate: "11/07/2022",
            brand: "Samsung",
            model: "Galaxy s8",
            client: "Carlos",
            status: 300,
            businessBranch: "Principal",
        },
        {
            id: 1,
            folio: 4,
            imei: "",
            admissionDate: "10/07/2022",
            brand: "Alcatel",
            model: "a50",
            client: "Jose miguel",
            status: 400,
            businessBranch: "Principal",
        },
        {
            id: 1,
            folio: 2,
            imei: "",
            admissionDate: "12/07/2022",
            brand: "Xiomi",
            model: "Redmi note 8",
            client: "Jose andres jimenez",
            status: 500,
            businessBranch: "Principal",
        },
        {
            id: 1,
            folio: 3,
            imei: "",
            admissionDate: "11/07/2022",
            brand: "Samsung",
            model: "Galaxy s8",
            client: "Carlos",
            status: 300,
            businessBranch: "Principal",
        },
        {
            id: 1,
            folio: 4,
            imei: "",
            admissionDate: "10/07/2022",
            brand: "Alcatel",
            model: "a50",
            client: "Jose miguel",
            status: 400,
            businessBranch: "Principal",
        },
    ],
};
