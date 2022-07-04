
// It copies an arrays and objects so you can have a brandnew value in memory.

// Not sure what time complexity this method has
// I am asumming it has a O(n) time complexity.
export const makeAbsoluteCopy = (value: any) => {
    return JSON.parse(JSON.stringify(value));
}