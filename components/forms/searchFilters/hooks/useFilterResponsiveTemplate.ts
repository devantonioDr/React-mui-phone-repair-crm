import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

const responsiveGrid = {
    "stacked": [
        [12, 12, 12],//First Row
        [12, 12, 12],//second Row
        [12, 12],//third Row

    ],
    "normal": [
        [6, 3, 3],//First Row
        [4, 4, 4],//second Row
        [6, 6],//third Row
    ]
};
export const useFilterResponsiveTemplate = ()=> {
    const [template,setTemplate] = useState<'normal'|'stacked'>('stacked');
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(()=>{
        if(md){ setTemplate("stacked"); return; }
        if(sm){ setTemplate("stacked"); return; }
        setTemplate("normal");
    },[md,sm])
    const mode = responsiveGrid[template];
    return mode;
}