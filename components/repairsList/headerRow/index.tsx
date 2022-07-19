import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";
import { withContextSelectAllCheckbox } from "../context/RowSelectContext";

export const SelectAllCheckBox = ({
  indeterminate,
  checked,
  onChange,
  ...props
}: any) => {
  return (
    <Checkbox
      color="primary"
      {...props}
      indeterminate={indeterminate}
      checked={checked}
      onChange={onChange}
      inputProps={{
        "aria-label": "select-all-repairs",
      }}
    />
  );
};

const SelectAllCheckBoxWithContext =
  withContextSelectAllCheckbox(SelectAllCheckBox);

export function RepairsTableHeader({ mode }: any) {
  let lables = [
    "",
    "Folio",
    // "IMEI",
    "Fecha de ingreso",
    "Marca",
    "Modelo",
    "Cliente",
    "Estado",
    "Sucursal",
    "Acciones",
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <SelectAllCheckBoxWithContext />
        </TableCell>
        {mode == "normal" &&
          lables.map((headCell) => (
            <TableCell
              // style={getRamdomBackgroundColor()}
              key={headCell}
              align={"left"}
              padding={"normal"}
            >
              <Typography variant="subtitle2">{headCell}</Typography>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}
