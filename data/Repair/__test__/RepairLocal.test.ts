import { makeAbsoluteCopy } from "../../../helper/makeAbsoluteCopy";
import RepairLocal from "../local/RepairLocal";

describe.only("Testing the RepairLocalMethods ", () => {

    it("Get all repairs", () => {
        let repairs = RepairLocal.all();
        expect(repairs.length).toBe(38);
    });

    it("Delete a single repair", () => {
        let repairs = makeAbsoluteCopy(RepairLocal.all());
        let wasDeleted = RepairLocal.deleteRepair(repairs[5]._id);
        expect(wasDeleted).toBe(true);

    });

    it("Updates a single repair", () => {
        let repairs = makeAbsoluteCopy(RepairLocal.all());
        repairs[5].device.model = "xiomy";
        let original = RepairLocal.updateRepair(repairs[5]);
        expect(original?.device.model).toBe("xiomy");
    });

});

export { };
