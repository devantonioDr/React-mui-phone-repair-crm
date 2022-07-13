import Box from '@mui/material/Box'
import React, { Children } from 'react'
import MainNav from '../mainNav'

export default function MainLayout({ children, title }: any) {
    return (
        <>
            <MainNav title={title} />
            <Box sx={{ mx: 2 }}>
                {children}
            </Box>
        </>
    )
};

MainLayout.defaultProps = {
    title: "Title"
}
