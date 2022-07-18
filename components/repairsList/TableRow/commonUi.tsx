import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";

export function InfoIdButton({ invoiceId }: { invoiceId: string }) {
  return (
    <Chip clickable={true} label={invoiceId} variant="filled" color="primary" />
  );
};

export function ShowMoreButton({
  onClick,
  invoiceId,
  isExpanded,
}: {
  isExpanded?: boolean;
  invoiceId?: string;
  onClick?: Function;
}) {
  return (
    <Box
      // style={getRamdomBackgroundColor()}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Button
        size="small"
        onClick={() => onClick && onClick(invoiceId)}
        disableRipple={false}
        variant="text"
      >
        {isExpanded ? "menos" : "mas"}
      </Button>
    </Box>
  );
}

export function RowExtraInfo({
  reasonForAdmission,
  isExpanded,
}: {
  reasonForAdmission: string;
  isExpanded?: boolean;
}) {
  return (
    <TableRow 
    // style={getRamdomBackgroundColor()}
    >
      <TableCell colSpan={11} padding="none" align="left">
        <Collapse in={isExpanded}>
          <Stack
            component={"div"}
            sx={{
              boxShadow:
                "inset 0 4px 8px -5px rgb(50 50 50 / 75%), inset 0 -4px 8px -5px rgb(50 50 50 / 75%);",
              padding: 2,
            }}
          >
            <Typography variant="subtitle2">
              Motivo de ingreso (Falla):
            </Typography>
            <Typography variant="subtitle1">{reasonForAdmission}</Typography>
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

export function SelectRowCheckBox({ selected, onClick, invoiceId }: any) {
  return (
    <Checkbox
      // style={getRamdomBackgroundColor()}
      color="primary"
      className="row_checkbox"
      checked={selected}
      onClick={() => onClick(invoiceId)}
      inputProps={{
        "aria-labelledby": invoiceId,
      }}
    />
  );
}
