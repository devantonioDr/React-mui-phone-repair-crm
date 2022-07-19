import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { withContextSelectRowCheckBox } from "../context/RowSelectContext";
import { withContextShowMore } from "../context/RowShowMoreContext";
import { StatusRow } from "../StatusRow";
import TableRowActions from "./actionsUi";
import { InfoIdButton, SelectRowCheckBox, ShowDate, ShowMoreButton } from "./commonUi";

// Assign context for SelectRowCheckBox actions
const SelectRowCheckBoxWithContext =
  withContextSelectRowCheckBox(SelectRowCheckBox);

// Assign context for ShowMore Row actions
const ShowMoreButtonWithContext = withContextShowMore(ShowMoreButton);



function SmallScreenRowCell({ title, value }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle2">{title}</Typography>
      <span>{value}</span>
    </Box>
  );
}

export const SmallScreenRowContent = ({ data }: { data: RepairData }) => {
  let { invoiceId, status, branchOffice, admissionDate, device, customer } =
    data;
  return (
    <>
      <TableCell padding="none" align="left">
        <Stack padding={2} spacing={3}>
          <SmallScreenRowCell
            title=""
            value={<SelectRowCheckBoxWithContext invoiceId={invoiceId} />}
          />

          <SmallScreenRowCell
            title="Folio:"
            value={<InfoIdButton invoiceId={invoiceId} />}
          />
          <SmallScreenRowCell title="IMEI:" value={""} />

          <SmallScreenRowCell title="Fecha de ingreso:" value={<ShowDate admissionDate={admissionDate} />} />

          <SmallScreenRowCell title="Marca:" value={device.trademark} />

          <SmallScreenRowCell title="Modelo:" value={device.model} />

          <SmallScreenRowCell title="Cliente:" value={customer.name} />

          <SmallScreenRowCell
            title="Estado:"
            value={<StatusRow status={status.key} />}
          />

          <SmallScreenRowCell
            title="Sucursal:"
            value={<Chip label={branchOffice.name} />}
          />
          <SmallScreenRowCell title="Acciones:" value={<TableRowActions />} />

          <ShowMoreButtonWithContext invoiceId={invoiceId} />
        </Stack>
      </TableCell>
    </>
  );
};
