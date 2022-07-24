import { useState } from "react";


const Vertices = [
    [2, 4, 5],//1
    [1, 3, 5, 6, 4],//2
    [2, 6, 5],//3
    [1, 2, 5, 8, 7],//4
    [1, 2, 3, 4, 6, 7, 8, 9],//5
    [3, 2, 5, 8, 9],//6
    [4, 5, 8],//7
    [7, 4, 5, 6, 9],//8
    [8, 5, 6],//9
];
const isDirectConnection = (
    currentValue: string,
    currentClickIndex: number,
) => {
    if (currentValue.trim() == "") return true;
    // Gets the index of the previously clicked element.
    let valueOfPreviousClicked = parseInt(currentValue[currentValue.length - 1]);

    // Determine if current is a direct connection of previous
    return Vertices[currentClickIndex].indexOf(valueOfPreviousClicked) > -1;
}

export const PatternDialerStateClicks = new Array(9).fill({ clicked: false });
export const PatternDialerStateValue = "";

export const usePatternDialerState = () => {
    const [value, setValue] = useState(PatternDialerStateValue);
    const [clicks, setClicks] = useState(PatternDialerStateClicks);

    console.log(value);

    return {
        values: {
            value,
            clicks
        },
        actions: {
            resetPattern: () => {
                setValue(PatternDialerStateValue);
                setClicks(PatternDialerStateClicks);
            },
            handleOnclick: (index: number) => {
                // if (clicks[index].clicked == false) {
                const hasDirectConnection = isDirectConnection(value, index);
                if (hasDirectConnection) {
                    // const newState = makeAbsoluteCopy(clicks);
                    // const current = newState[index];
                    // current.clicked = true;

                    const newState = [
                        clicks.slice(0, index),
                        { ...clicks[index], clicked: true },
                        clicks.slice(index)
                    ];
                    setClicks(newState);
                    setValue(value + `${index + 1}`);
                } else {
                    console.log("No tiene una connecion directa.")
                }

                // };
            }
        }
    }
}