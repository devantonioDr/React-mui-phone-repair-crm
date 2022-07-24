import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import { InsertRepairButton } from '../forms/insertRepair/UI/InsertRepairButton'

export default function RepairsListTopOptions() {
    return (
        <Box component="div" sx={{ my: 2, width: "100%", display: "flex", justifyContent: "space-between" }}>
            <div>
                <Pagination
                shape={"rounded"}
                    siblingCount={1}
                    color="primary"
                    count={40}
                    page={1}
                    onChange={(event: any, value: any) => console.log(event, value)}
                />
            </div>
            <div>
                <InsertRepairButton />
            </div>
        </Box>
    )
}
