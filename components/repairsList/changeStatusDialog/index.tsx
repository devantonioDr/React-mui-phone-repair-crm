import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { useToggleDialog } from "../hooks/useChangeStatusDialog";
import LoadingButton from "@mui/lab/LoadingButton";

export interface RepairChangeStatusDialogProps {
  open: boolean;
  repairId: string;
  selectedValue: number;
  onClose: () => void;
  notifySave?: ({}: any) => void;
}

export function RepairChangeStatusDialog(props: RepairChangeStatusDialogProps) {
  const [selectedStatus, setSelectedStatus] = React.useState<any>(
    props.selectedValue
  );
  const [statuses, setStatuses] = React.useState<RepairStatus[]>([]);
  const [isloading, setIsloading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if(props.open == true){
      fetch("./api/status")
        .then((data) => data.json())
        .then((data) => setStatuses(data.data));
    }
  }, [props.open]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
  };
  const handleSave = () => {
    setIsloading(true);
    fetch(`/api/repairs/${props.repairId}/status`, {
      body: JSON.stringify({ status: selectedStatus }),
      method: "PUT",
    })
      .then((data) => data.json())
      .then(async (e) => {
        props.notifySave && (await props.notifySave(e));
        setIsloading(false);
        props.onClose();
      });
  };

  return (
    <Dialog onClose={() => {}} open={props.open}>
      <DialogTitle>Modificar estado</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 200, minHeight: 100, pt: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="repair-update-status-dialog-label">
              Nuevo estado
            </InputLabel>
           {statuses.length > 0 && <Select
              disabled={isloading}
              labelId="repair-update-status-dialog-label"
              id="repair-update-status-dialog"
              value={selectedStatus}
              label="Nuevo estado"
              onChange={handleChange}
            >
              {statuses.map((data) => (
                <MenuItem key={`statusDialog_${data.key}`} value={data.key}>
                  {data.title}
                </MenuItem>
              ))}
            </Select>}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={isloading} onClick={() => props.onClose()}>
          Cancelar
        </Button>
        <LoadingButton
          loading={isloading}
          variant="contained"
          onClick={handleSave}
          autoFocus
        >
          <SaveIcon fontSize={"small"} sx={{ mr: 1 }} />
          <span style={{ marginTop: "3px" }}>Guardar</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default function ChangeStatusDialog() {
  const { open, handleClickOpen, handleClose } = useToggleDialog();

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <RepairChangeStatusDialog
        repairId="62bdb3148a08ee00bc4400b1"
        selectedValue={300}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
