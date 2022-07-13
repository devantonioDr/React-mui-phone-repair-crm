import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
// Status
/**
 * Pendiente : 300
 * En proceso: 400
 * Terminada : 500
 * En Sucursal:600
 */


export function StatusRow({ status }: { status: 300 | 400 | 500 | 600 }) {
    const commonStyles = { fontSize: '10px' }
    switch (status) {
        case 300:
            return (<Chip label="Pendiente" color="error" />)
        case 400:
            return (<Chip label="En proceso" color="warning" />)
        case 500:
            return (<Chip label="Terminada" color="success" />)
        case 600:
            return (<Chip label="En sucursal" color="primary" />)
        default:
            return <Chip label={status} color="primary" />
    }
};