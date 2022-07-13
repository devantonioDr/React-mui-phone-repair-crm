import React from 'react'
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


const ButtonWithToolTip = ({title,Icon}:any) => {
    return (
        <Tooltip arrow title={title}>
            <IconButton size='small'>
                <Icon color='disabled' fontSize={"small"}  />
            </IconButton>
        </Tooltip>
    )
}

export default function TableRowActions() {
    return (
        <Stack direction="row" spacing={0}>
            <ButtonWithToolTip title="Modificar estado" Icon={DevicesOtherIcon} />
            <ButtonWithToolTip title="Agregar movimiento" Icon={SwapVertIcon} />
            <ButtonWithToolTip title="Eliminar" Icon={DeleteIcon} />
        </Stack>
    )
}
