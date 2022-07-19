import TableCell from "@mui/material/TableCell";
import { StatusRow } from "../StatusRow";
import TableRowActions from "./actionsUi";
import Chip from "@mui/material/Chip";
import { withContextSelectRowCheckBox } from "../context/RowSelectContext";

import React from "react";
import {
  InfoIdButton,
  SelectRowCheckBox,
  ShowDate,
  ShowMoreButton,
} from "./commonUi";
import { withContextShowMore } from "../context/RowShowMoreContext";

const ShowMoreButtonWithContext = withContextShowMore(ShowMoreButton);
const SelectRowCheckBoxWithContext =
  withContextSelectRowCheckBox(SelectRowCheckBox);

export const NormalRowContent = ({ data }: { data: RepairData }) => {
  let { invoiceId, status, branchOffice, admissionDate, device, customer } =
    data;

  console.log("NormalRowContent rerendered");
  return (
    <>
      <TableCell align="left">
        <SelectRowCheckBoxWithContext invoiceId={invoiceId} />
      </TableCell>
      <TableCell align="left">
        <ShowMoreButtonWithContext invoiceId={invoiceId} />
      </TableCell>
      <TableCell align="left">
        <InfoIdButton invoiceId={invoiceId} />
      </TableCell>
      {/* <TableCell align="left"> {""}</TableCell> */}
      <TableCell align="left">
        <ShowDate admissionDate={admissionDate} />
      </TableCell>
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
