import Chip from "@mui/material/Chip"
// Status
/**
 * Pendiente : 300
 * En proceso: 400
 * Terminada : 500
 * En Sucursal:600
 */


export function StatusRow({ status }: { status: number }) {
    switch (status) {
        case 100:
            return (<Chip label="Pendiente" color="error" />)
        case 200:
            return (<Chip label="En proceso" color="warning" />)
        case 300:
            return (<Chip label="Terminada" color="success" />)
        case 310:
            return (<Chip label="En sucursal" color="secondary" />)
        case 400:
            return (<Chip label="Entregada al cliente" color="primary" />)
        default:
            return <Chip label={status} color="primary" />
    }
};