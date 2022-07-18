import React, { useContext } from "react";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { RowChangeStatusDialogContext } from "../context/RowChangeStatusDialogContext";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";

const ButtonWithToolTip = ({ title, Icon, onClick }: any) => {
  return (
    <Tooltip arrow title={title}>
      <IconButton onClick={onClick} size="small">
        <Icon color="disabled" fontSize={"small"} />
      </IconButton>
    </Tooltip>
  );
};

const ModifyStatusButton = () => {
  const state = useContext(RowChangeStatusDialogContext);
  let {
    changeStateDialog: { handleClickOpen },
  } = state;
  return (
    <ButtonWithToolTip
      onClick={handleClickOpen}
      title="Modificar estado"
      Icon={DevicesOtherIcon}
    />
  );
};

export default function TableRowActions() {
  return (
    <Stack style={getRamdomBackgroundColor()} direction="row" spacing={0}>
      <ModifyStatusButton />
      <ButtonWithToolTip title="Agregar movimiento" Icon={SwapVertIcon} />
      <ButtonWithToolTip title="Eliminar" Icon={DeleteIcon} />
    </Stack>
  );
}
