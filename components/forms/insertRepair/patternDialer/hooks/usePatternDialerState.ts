import { useCallback, useState } from "react";
import { makeAbsoluteCopy } from "../../../../../helper/makeAbsoluteCopy";
import { UsePatternDialerStateHelper } from "./usePatternDialerStateHelper";

export const usePatternDialerStateClicks = new Array(9).fill({ clicked: false });
export const usePatternDialerStateValue = "";

export const usePatternDialerState = () => {
    const [value, setValue] = useState(usePatternDialerStateValue);
    const [clicks, setClicks] = useState(usePatternDialerStateClicks);

    console.log(value);

    const resetPattern = useCallback(() => {
        setValue("");
        setClicks(usePatternDialerStateClicks);
    }, []);
    const handleOnclick = useCallback((index: number) => {
        setValue((value: string) => {
            // Check if previous click item is a direct connection of the previous clicked.
            const hasDirectConnection = UsePatternDialerStateHelper.isDirectConnection(value, index);
            if (!hasDirectConnection) return value;

            // set clicked:true at the index provided.
            setClicks(clicks => [
                ...clicks.slice(0, index),
                { ...clicks[index], clicked: true },
                ...clicks.slice(index + 1)
            ]
            );

            return value + `${index + 1}`;
        });
    }, []);

    return {
        values: {
            value,
            clicks
        },
        actions: {
            resetPattern,
            handleOnclick
            // handleOnclick: (index: number) => {
            //     // if (clicks[index].clicked == false) {
            //     const hasDirectConnection = UsePatternDialerStateHelper.isDirectConnection(value, index);
            //     if (hasDirectConnection) {
            //         // const newState = makeAbsoluteCopy(clicks);
            //         // const current = newState[index];
            //         // current.clicked = true;
            //         setValue(value => value + `${index + 1}`)
            //         setClicks([]);
            //     } else {
            //         console.log("No tiene una connecion directa.")
            //     }

            //     // };
            // }
        }
    }
}