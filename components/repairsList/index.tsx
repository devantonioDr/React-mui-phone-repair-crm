import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ContainerType1 from "../containerType1";
import { RepairsTableHeader } from "./headerRow";
import { RepairsTableRow } from "./TableRow";
import useRepairListResponsiveRow from "./hooks/useResponsiveRow";
import { RepairListContext } from "./context";
import { withContextSelectRowHeader } from "./context/RowSelectContext";

import { TableToolbar } from "./TableToolbar";


// Connect contexts.
const RepairsTableOptionsForSelectedWithContext =
  withContextSelectRowHeader(TableToolbar);

export default function RepairsTable() {
  const repairListContext = React.useContext(RepairListContext);
  const mode = useRepairListResponsiveRow();

  return (
    <ContainerType1 Title="Listado de reparaciones">
      <RepairsTableOptionsForSelectedWithContext selectedCount={0} />
      <TableContainer>
        <Table
          sx={{ minWidth: 3, padding: "0px 16px 0px 16px" }}
          aria-labelledby="tableTitle"
          size={"small"}
        >
          <RepairsTableHeader mode={mode} />
          <TableBody>
            {repairListContext.repairs
              .slice(0, 3)
              .map((data: RepairData, index: number) => {
                return (
                  <RepairsTableRow
                    key={`${data._id}_repair_row_${index}`}
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
RepairsTable.defaultProps = {};
