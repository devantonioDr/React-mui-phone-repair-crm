import Grid from '@mui/material/Grid'
import React from 'react'


// interface FormLayoutProps {}
export default function FormLayout({ children }: any) {
    return (
        <Grid style={{ paddingTop: "20px" }} columnSpacing={1} columns={12} container spacing={3}>
            {children}
        </Grid>
    )
}
export function FormLayoutItem({ children,isCheckBox,collumns }: any) {
    return (
        <Grid style={isCheckBox ? {} : { paddingTop: '0px' }} item xs={collumns}>
            {children}
        </Grid>
    )
}
FormLayoutItem.defaultProps ={
    isCheckBox:false,
    collums:6
}
