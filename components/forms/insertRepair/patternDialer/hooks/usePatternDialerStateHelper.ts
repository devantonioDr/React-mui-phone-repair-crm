export class UsePatternDialerStateHelper {

    public static Vertices = [
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
    public static isDirectConnection(
        currentValue: string,
        currentClickIndex: number,
    ) {
        if(currentValue.trim() == "") return true;
        // Gets the index of the previously clicked element.
        let valueOfPreviousClicked = parseInt(currentValue[currentValue.length - 1]);
        
        // Determine if current is a direct connection of previous
        return this.Vertices[currentClickIndex].indexOf(valueOfPreviousClicked) > -1;

    }

    public static clearPattern(
        valueSetter: any,
        currentClickIndex: number,
    ) {
       


    }
}