import Button from "@mui/material/Button";
import { useContext } from "react"
import { InsertRepairContext } from "../../../../context/InsertRepairContextProvider";


export const InsertRepairButtonWithContextHolder = () => {
    const { dialogHook } = useContext(InsertRepairContext);

};

export const InsertRepairButton = () => {
    const { dialogHook } = useContext(InsertRepairContext);

    return <Button variant="contained" onClick={dialogHook.toggle}>
        Agregar reparación
    </Button>
}