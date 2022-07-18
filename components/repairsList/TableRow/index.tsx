import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { StatusRow } from "../StatusRow";
import { TemplateMode } from "../../../types/Template";
import TableRowActions from "./actionsUi";
import Chip from "@mui/material/Chip";

import { Children, useContext } from "react";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";
import { RowSelectContext, withContextSelectRowCheckBox, withContextSelectRowTableRow } from "../context/RowSelectContext";
import { InmutableArrayMethods } from "../../../helper/inmutableArrayMethods";
import { RowChangeStatusDialogContextProvider } from "../context/RowChangeStatusDialogContext";

import React from "react";
import { RowExtraInfo, SelectRowCheckBox, ShowMoreButton } from "./commonUi";
import { SmallScreenRowContent } from "./smallScreen";
import { withContextShowMore } from "../context/RowShowMoreContext";

// Assign context for ShowMore Row actions
const ShowMoreButtonWithContext = withContextShowMore(ShowMoreButton);
const RowExtraInfoWithContext = withContextShowMore(RowExtraInfo);

// Assign context for Selected Row actions;
const TableRowWithContext = withContextSelectRowTableRow(TableRow);



const NormalRowContent = ({ data }: { data: RepairData }) => {
  let { invoiceId, status, branchOffice, admissionDate, device, customer } =
    data;

  console.log("NormalRowContent rerendered");
  return (
    <>
      <TableCell align="left">
        <SelectRowCheckBox invoiceId={invoiceId} />
      </TableCell>
      <TableCell align="left">
        <ShowMoreButtonWithContext invoiceId={invoiceId} />
      </TableCell>
      <TableCell align="left">
        <Chip
          clickable={true}
          label={invoiceId}
          variant="filled"
          color="primary"
        />
      </TableCell>
      <TableCell align="left"> {""}</TableCell>
      <TableCell align="left"> {admissionDate}</TableCell>
      <TableCell align="left"> {device.trademark}</TableCell>
      <TableCell align="left"> {device.model}</TableCell>
      <TableCell align="left"> {customer.name}</TableCell>
      <TableCell align="left">
        <StatusRow status={status.key} />
      </TableCell>
      <TableCell align="left">
        <Chip label={branchOffice.name} />
      </TableCell>
      <TableCell align="left">
        <TableRowActions />
      </TableCell>
    </>
  );
};

class RowMainContentWrapper extends React.PureComponent<any> {
  render(): React.ReactNode {
    let { layOutMode, rowData }: any = this.props;
    return (
      <RowChangeStatusDialogContextProvider rowData={rowData}>
        {layOutMode == "normal" && <NormalRowContent data={rowData} />}
        {layOutMode == "stacked" && <SmallScreenRowContent data={rowData} />}
      </RowChangeStatusDialogContextProvider>
    );
  }
};

export function RepairsTableRow({
  data,
  mode,
}: {
  data: RepairData;
  mode: TemplateMode;
}) {
  // console.log("RepairsTableRow rerendered.");
  const m = InmutableArrayMethods;
  const rowSelectContext = useContext(RowSelectContext);
  const selectedRows = rowSelectContext.selectedRows;

  // Check if the current invoice id is present in the list of selected rows.
  // selected = true if present.
  const selected = !m.isItemNotInTheList(
    m.getIndexOfValue(selectedRows, data.invoiceId)
  );
  // const selected = true;
  return (
    <>
      <TableRowWithContext invoiceId={data.invoiceId}>
        <RowMainContentWrapper layOutMode={mode} rowData={data} />
      </TableRowWithContext>
      {/* Show more row */}
      <RowExtraInfoWithContext
        reasonForAdmission={data.device.reasonForAdmission}
        invoiceId={data.invoiceId}
      />
    </>
  );
};
