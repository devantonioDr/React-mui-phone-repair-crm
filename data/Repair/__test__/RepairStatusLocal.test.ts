import RepairStatusLocal from "../local/RepairStatusLocal";

describe("Testing the RepairStatusLocal ", () => {

    it("Get all Repairs statuses", () => {
        let statuses = RepairStatusLocal.all();
        expect(statuses.length).toBe(5);
    });

    it("Get single repair status by key", () => {
        let reapirStatus = RepairStatusLocal.getSingleRepairByKey(400);
        expect(reapirStatus).not.toBe(null);

    });


});

export { };
