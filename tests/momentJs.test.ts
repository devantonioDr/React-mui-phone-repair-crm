import moment from "moment";

describe("testing moment library", () => {


    it("Formats time properly", () => {
       const date =  moment("2022-07-18T23:22:44.994Z").format("DD-MM-YYYY");
       
       expect(date).toBe("19-07-2022");
       
    })
});

export { }