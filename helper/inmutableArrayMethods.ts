
// Helper for handling array without mutating it.
// This is good for handling react state  with arrays.
// Because they don't mutate the original array.
// they return a copy with the changes made.

export const InmutableArrayMethods = {

    // Gets the index of given value of the arrat
    getIndexOfValue:(array:any[],value:any) => array.indexOf(value),

    //  Checks if a value is present in an array.
    isItemNotInTheList: (index: number) => index === -1,

    // Removes the first item of the array.
    removeFirstItemOfTheList: (array: any[]) =>
        new Array().concat(array.slice(1)),

    //Removes last item of the array.
    removeLastItemOfTheList: (array: any[]) =>
        new Array().concat(array.slice(0, -1)),
    
    //Removes item the given index position. 
    removeItemAtTheIndexPosition: (array: any, index: number) =>
        new Array().concat(array.slice(0, index), array.slice(index + 1)),

    //Checks if given index corresponds to the first item in the list. 
    isFirstItemInTheList: (index: number) => index === 0,

    //Checks if given index corresponds to the last item in the list.
    isLastItemInTheList: (array: any[], index: number) =>
        index === array.length - 1,
    
    //Checks if the given index corrensponds to an index that is grater then 0 in the list
    isSomeWhereInTheList: (index: number) => index > 0,

    //Adds a values to the end of the array.
    addValueToTheEndOfTheList: (array: any[], value: any) =>
        new Array().concat(array, value),
};
