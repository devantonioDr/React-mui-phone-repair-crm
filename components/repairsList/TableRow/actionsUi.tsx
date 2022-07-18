import React, { useContext } from "react";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { RowChangeStatusDialogContext, withContextRowChangeStatusDialogToggle } from "../context/RowChangeStatusDialogContext";
import { getRamdomBackgroundColor } from "../../../helper/getRamdomColor";
import { withContextDeleteDialogToggle } from "../context/RowDeleteContext";

const ButtonWithToolTip = ({ title, Icon, onClick }: any) => {
  return (
    <Tooltip arrow title={title}>
      <IconButton onClick={onClick} size="small">
        <Icon color="disabled" fontSize={"small"} />
      </IconButton>
    </Tooltip>
  );
};

const ModifyStatusButton = ({handleClickOpen}:{handleClickOpen?:Function}) => {
  return (
    <ButtonWithToolTip
      style={getRamdomBackgroundColor()}
      onClick={handleClickOpen}
      title="Modificar estado"
      Icon={DevicesOtherIcon}
    />
  );
};

const DeleteRepairButton = ({handleClickOpen}:{handleClickOpen?:Function}) => {
  return (
    <ButtonWithToolTip
      style={getRamdomBackgroundColor()}
      onClick={handleClickOpen}
      title="Eliminar"
      Icon={DeleteIcon}
    />
  );
};

const ModifyStatusButtonWithContext = withContextRowChangeStatusDialogToggle(ModifyStatusButton);
const DeleteWithContext = withContextDeleteDialogToggle(DeleteRepairButton);

export default function TableRowActions() {
  return (
    <Stack  direction="row" spacing={0}>
      <ModifyStatusButtonWithContext />
      <ButtonWithToolTip title="Agregar movimiento" Icon={SwapVertIcon} />
      <DeleteWithContext />
    </Stack>
  );
}
