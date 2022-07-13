import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { RowData } from "..";
import { StatusRow } from "../StatusRow";
import { TemplateMode } from "../../../types/Template";
import TableRowActions from "./TableRowActions";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import { useContext, useState } from "react";
import { RowContext, RowContextProvider } from "./rowContext";

function NormalRowContent({ data }: { data: RowData }) {
  const state = useContext(RowContext);

  return (
    <>
      <TableCell align="left">
        <Checkbox
          color="primary"
          checked={false}
          inputProps={{
            "aria-labelledby": "id",
          }}
        />
      </TableCell>
      <TableCell align="left">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            onClick={() => state.setExpanded(!state.expanded)}
            disableRipple={true}
            variant="text"
          >
            {state.expanded ? "menos" : "mas"}
          </Button>
        </Box>
      </TableCell>
      <TableCell align="left">
        <Chip clickable={true} label={data.folio} variant="filled" color="primary" />
      </TableCell>
      <TableCell align="left"> {data.imei}</TableCell>
      <TableCell align="left"> {data.admissionDate}</TableCell>
      <TableCell align="left"> {data.brand}</TableCell>
      <TableCell align="left"> {data.model}</TableCell>
      <TableCell align="left"> {data.client}</TableCell>
      <TableCell align="left">
        <StatusRow status={data.status} />
      </TableCell>
      <TableCell align="left">
        <Chip label={data.businessBranch} />
      </TableCell>
      <TableCell align="left">
        <TableRowActions />
      </TableCell>
    </>
  );
}
function SmallScreenRow({ title, value }: any) {
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
function RowExtraInfo({ reason }: any) {
  const state = useContext(RowContext);
  console.log(state);
  return (
    <>
      <Collapse in={state.expanded}>
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
          <Typography variant="subtitle1">{reason}</Typography>
        </Stack>
      </Collapse>
    </>
  );
}
function SmallScreenRowContent({ data }: { data: RowData }) {
  const state = useContext(RowContext);

  return (
    <>
      <TableCell padding="none" align="left">
        {/*  "",
        "Folio",
        "IMEI",
        "Fecha de ingreso",
        "marca",
        "modelo",
        "Cliente",
        "Estado",
        "Sucursal",
        
        */}
        <Stack padding={2} spacing={3}>
          <SmallScreenRow
            title=""
            value={
              <Checkbox
                color="primary"
                checked={false}
                inputProps={{
                  "aria-labelledby": "id",
                }}
              />
            }
          />

          <SmallScreenRow
            title="Folio:"
            value={
              <Button
              size="small"
                sx={{ boxShadow: "none" }}
                color="info"
                variant="contained"
              >
                {data.folio}
              </Button>
            }
          />
          <SmallScreenRow title="IMEI:" value={data.imei} />

          <SmallScreenRow
            title="Fecha de ingreso:"
            value={data.admissionDate}
          />

          <SmallScreenRow title="Marca:" value={data.brand} />

          <SmallScreenRow title="Modelo:" value={data.model} />

          <SmallScreenRow title="Cliente:" value={data.client} />

          <SmallScreenRow
            title="Estado:"
            value={<StatusRow status={data.status} />}
          />

          <SmallScreenRow
            title="Sucursal:"
            value={<Chip label={data.businessBranch} />}
          />
          <SmallScreenRow title="Acciones:" value={<TableRowActions />} />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="small"
              onClick={() => state.setExpanded(!state.expanded)}
              disableRipple={true}
              variant="text"
            >
              Mostrar {state.expanded ? "menos" : "mas"}
            </Button>
          </Box>
        </Stack>
      </TableCell>
    </>
  );
}

export function RepairsTableRow({
  data,
  mode,
}: {
  data: RowData;
  mode: TemplateMode;
}) {
  console.log(data);
  return (
    <RowContextProvider>
      <TableRow hover={false}>
        {mode == "normal" && <NormalRowContent data={data} />}
        {mode == "stacked" && <SmallScreenRowContent data={data} />}
      </TableRow>
      <TableRow>
        <TableCell colSpan={11} padding="none" align="left">
          <RowExtraInfo reason="Cambio de pantalla" />
        </TableCell>
      </TableRow>
    </RowContextProvider>
  );
}
