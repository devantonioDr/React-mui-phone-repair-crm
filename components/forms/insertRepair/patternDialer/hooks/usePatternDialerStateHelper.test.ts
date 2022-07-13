import { UsePatternDialerStateHelper } from "./usePatternDialerStateHelper";

describe("Make sure all of the usePatternDialerStateHelper methods work fine", () => {

    it("When Clicked element has direc connection with previous element", () => {

        // When it is a direct connection returns true.
        let currentValue = "223";
        let currentIndex = 1; //2
        expect(UsePatternDialerStateHelper.isDirectConnection(currentValue, currentIndex)).toBe(true);

    })
    it("When Clicked element does not have direc connection with previous element", () => {

        // When it is a direct connection returns true.
        let currentValue = "223";
        let currentIndex = 0; //2
        expect(UsePatternDialerStateHelper.isDirectConnection(currentValue, currentIndex)).toBe(false);

    })

    it("Resets the pattern", () => {

        // When it is a direct connection returns true.
        let currentValue = "223";
        let currentIndex = 0; //2
        expect(UsePatternDialerStateHelper.isDirectConnection(currentValue, currentIndex)).toBe(false);

    })
})


export { }