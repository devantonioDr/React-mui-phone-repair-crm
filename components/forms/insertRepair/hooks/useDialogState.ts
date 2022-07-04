import { useState } from "react";

export const useDialogState = () => {
    // Dialog state
    const [open, setOpen] = useState(true);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return {open, handleClickOpen, handleClose}
}