import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import FilterListIcon from "@mui/icons-material/FilterList";
import Paper from '@mui/material/Paper'



export default function ContainerType1({
    children,
    Title,
    Icon
}:any) {
    return (
        <Box sx={{ width: "100%" }}>
            {/* APP BAR */}
            <AppBar elevation={0} position="static">
                <Toolbar sx={{ paddingLeft: 2 }} disableGutters={true} variant="dense">
                    <Icon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {Title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={0} sx={{p:2}} >
                {children}
            </Paper>
        </Box>
    )
}
ContainerType1.defaultProps = {
    Title:"Title",
    Icon:FilterListIcon
}