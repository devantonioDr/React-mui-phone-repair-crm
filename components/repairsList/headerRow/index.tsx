import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { memo, useContext } from "react";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";
import { RepairListContext } from "../context";
import { RowSelectContext } from "../context/RowSelectContext";

// Wrapper for both  RowSelectContext, RepairListContext dependent element.
const selectAllCheckBoxWithState = (Checkbox: any) => {
  const PureCheckBox = memo(Checkbox);

  return (props: any) => {
    const rowSelectionContext = useContext(RowSelectContext);
    const repairList = useContext(RepairListContext);
    const selectedCount = rowSelectionContext.selectedRows.length;
    const rowsCount = repairList.repairs.length;

    const areRowsPartiallySelected =
      selectedCount > 0 && selectedCount < rowsCount;
    const areAllRowsSelected = rowsCount > 0 && rowsCount == selectedCount;

    return (
      <PureCheckBox
        {...props}
        indeterminate={areRowsPartiallySelected}
        checked={areAllRowsSelected}
        onChange={(e: any) => {
          rowSelectionContext.handleSelectAll(e);
        }}
      />
    );
  };
};

const SelectAllCheckBox = ({
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
  selectAllCheckBoxWithState(SelectAllCheckBox);

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
              style={getRamdomBackgroundColor()}
              key={headCell}
              align={"left"}
              padding={"normal"}
            >
              <strong>{headCell}</strong>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}
