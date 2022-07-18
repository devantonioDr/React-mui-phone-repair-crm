import { MultiSelectUnstyled } from "@mui/base";
import { RepairFakeData } from "../mockedData/RepairData";
import RepairInterface from "../interfaces/Repair";

class RepairLocal implements RepairInterface {
  repairs: RepairData[];
  constructor() {
    console.log("RepairLocal instanciated.");
    this.repairs = RepairFakeData;
  }
  all() {
    return this.repairs;
  }
  deleteRepair(_id: any) {
    // O(n)
    // To avoid memory performance issues.
    // Initiated array with fixed length.
    let wasEverDeleted = false;
    const newState = new Array(this.repairs.length - 2);
    let index = 0;
    for (let repair of this.repairs) {
      if (repair._id != _id) {
        newState[index] = repair;
        index++;
      }
      if (repair._id == _id) {
        wasEverDeleted = true;
      }
    }
    this.repairs = newState;
    return wasEverDeleted;
  }
  updateRepair(newData: RepairData) {
    // Find the correct item in the data storage by the id.
    const index = this.repairs.findIndex(
      (data: RepairData) => newData._id == data._id
    );
    if (index > -1) {
      this.repairs[index] = newData;
      return this.repairs[index];
    }
    return null;
  }
  getSingleRepair(_id: any) {
    // Find the correct item in the data storage by the id.
    const index = this.repairs.findIndex((data: RepairData) => _id == data._id);
    if (index > -1) {
      return this.repairs[index];
    }
    return null;
  }
}

export default new RepairLocal();
