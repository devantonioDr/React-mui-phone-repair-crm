import { useState } from "react";
import { makeAbsoluteCopy } from "../../../../../helper/makeAbsoluteCopy";
import { UsePatternDialerStateHelper } from "./usePatternDialerStateHelper";

export const usePatternDialerStateClicks = new Array(9).fill({ clicked: false });
export const usePatternDialerStateValue = "";

export const usePatternDialerState = () => {
    const [value, setValue] = useState(usePatternDialerStateValue);
    const [clicks, setClicks] = useState(usePatternDialerStateClicks);

    console.log(value);

    return {
        values: {
            value,
            clicks
        },
        actions: {
            resetPattern:()=>{
                setValue("");
                setClicks(usePatternDialerStateClicks);
            },
            handleOnclick: (index: number) => {
                // if (clicks[index].clicked == false) {
                    const hasDirectConnection = UsePatternDialerStateHelper.isDirectConnection(value, index);
                    if(hasDirectConnection){
                        const newState = makeAbsoluteCopy(clicks);
                        const current = newState[index];
                        current.clicked = true;
                        setValue(value + `${index + 1}`)
                        setClicks(newState);
                    }else{
                        console.log("No tiene una connecion directa.")
                    }
                    
                // };
            }
        }
    }
}