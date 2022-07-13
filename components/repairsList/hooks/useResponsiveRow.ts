import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { TemplateMode } from "../../../types/Template";


const useRepairListResponsiveRow = () => {
    const [template, setTemplate] = useState<TemplateMode>('stacked');
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
        if (sm) { setTemplate("stacked"); return; }
        setTemplate("normal");
    }, [sm]);
    return template;
}
export default useRepairListResponsiveRow;