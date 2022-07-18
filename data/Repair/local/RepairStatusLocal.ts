import RepairStatusInterface from "../interfaces/RepairStatus";
import { RepairStatusData } from "../mockedData/RepairStatus";

class RepairStatusLocal implements RepairStatusInterface {
  statuses: RepairStatus[];
  constructor() {
    this.statuses = RepairStatusData;
  }
  all() {
    return this.statuses;
  }
  getSingleRepairByKey(key: number) {
    let statusIndex = this.statuses.findIndex((value) => value.key == key);
    if (statusIndex > -1) {
      return this.statuses[statusIndex];
    }
    return null;
  }
}

export default new RepairStatusLocal();
