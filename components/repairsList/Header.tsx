import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function RepairsTableHeader({ mode }: any) {
    let lables = [
        "",
        "Folio",
        "IMEI",
        "Fecha de ingreso",
        "Marca",
        "Modelo",
        "Cliente",
        "Estado",
        "Sucursal",
        "Acciones"
    ];
    return (
        <TableHead>
            <TableRow>
                <TableCell  >
                    <Checkbox color="primary" />
                </TableCell>
                {mode == "normal" && lables.map((headCell) => (
                    <TableCell key={headCell} align={"left"} padding={"normal"}>
                        <strong>{headCell}</strong>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}