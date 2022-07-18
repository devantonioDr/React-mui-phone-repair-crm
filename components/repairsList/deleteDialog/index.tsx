import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from "@mui/icons-material/Save";
import { useToggleDialog } from "../hooks/useChangeStatusDialog";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";

export interface RepairChangeStatusDialogProps {
  open: boolean;
  repairId: string;
  selectedValue: number;
  onClose: () => void;
  notifySave?: ({}: any) => void;
}

export function DeleteDialog(props: RepairChangeStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = React.useState<any>(
    props.selectedValue
  );
  const [statuses, setStatuses] = React.useState<RepairStatus[]>([]);
  const [isloading, setIsloading] = React.useState<boolean>(false);

  React.useEffect(() => {}, [props.open]);

  const handleChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };
  const handleSave = () => {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
    // fetch(`/api/repairs/${props.repairId}/status`, {
    //   body: JSON.stringify({ status: selectedStatus }),
    //   method: "PUT",
    // })
    //   .then((data) => data.json())
    //   .then(async (e) => {
    //     props.notifySave && (await props.notifySave(e));
    //     setIsloading(false);
    //     props.onClose();
    //   });
  };

  return (
    <Dialog  maxWidth="sm" onClose={() => {}} open={props.open}>
      <DialogTitle>¿Está seguro que desea eliminar la reparación?</DialogTitle>
      <DialogContent>
        <Typography>
          Una vez eliminada, no se puede recuperar ningún dato de ella.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button disabled={isloading} onClick={() => props.onClose()}>
          NO, CANCELAR
        </Button>
        <LoadingButton
          color="error"
          loading={isloading}
          variant="contained"
          onClick={handleSave}
          autoFocus
        >
          <DeleteIcon fontSize={"small"} sx={{ mr: 1 }} />
          <span style={{ marginTop: "3px" }}>SI, ELIMINAR</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default function DeleteRepairDialog() {
  const { open, handleClickOpen, handleClose } = useToggleDialog();

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Delete Dialog
      </Button>
      <DeleteDialog
        repairId="62bdb3148a08ee00bc4400b1"
        selectedValue={300}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
