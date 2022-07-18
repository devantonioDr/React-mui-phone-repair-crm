import type { NextApiRequest, NextApiResponse } from "next";
import RepairLocal from "../data/Repair/local/RepairLocal";
import RepairStatusLocal from "../data/Repair/local/RepairStatusLocal";
type Data = {
  status: "ok" | "error";
  message?: string;
  data?: RepairData[] | RepairData;
};

export class RepairController {
  public static getAll(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
      const repairs = RepairLocal.all();
      res.status(200).json({ status: "ok", data: repairs });
    } catch (e: any) {
      res.status(400).json({ status: "error", message: e });
    }
  }
  public static updateRepairStatus(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    try {
      // If status key not provided.
      const data = JSON.parse(req.body);
      if (!data.status) throw "status parameter was not provided";

      // If repair status not found.
      const repairStatus = RepairStatusLocal.getSingleRepairByKey(data.status);
      if (!repairStatus) throw `status with key ${data.status} was not found.`;

      // If repair is not found.
      let singleRepair = RepairLocal.getSingleRepair(req.query.id);
      if (!singleRepair) throw `repair id ${req.query.id} was not found.`;

      // Try to update single repair.
      singleRepair.status = repairStatus;
      const updatedRepair = RepairLocal.updateRepair(singleRepair);
      // If success.
      if (updatedRepair)
        res.status(200).json({ status: "ok", data: updatedRepair });

      return;
    } catch (e: any) {
      res.status(400).json({ status: "error", message: e });
    }
  }
  public static deleteRepair(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
      let data = JSON.parse(req.body);

      // If _id is not present in the request.
      if (!data._id) throw `Id ${data._id} missing in the request body.`;

      // try and delete the resource.
      let newData = RepairLocal.deleteRepair(data._id);
      if (newData) {
        let message = `Id ${data._id} deleted succesfully.`;
        res.status(201).json({ status: "ok", message });
        console.log(message);
        return;
      }
      throw `Id ${data._id} was not found.`;
    } catch (e: any) {
      res.status(400).json({ status: "error", message: e });
    }
  }
  public static updateRepair(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
      let data = JSON.parse(req.body);
      // Check if body object has all needed keys
      let missingKeys = check_keys(data, needed_keys);
      if (missingKeys.length > 0) throw `Keys ${missingKeys} are missing.`;

      // Put request succeded.
      let newData = RepairLocal.updateRepair(data);
      if (newData) {
        let message = `Resource with id "${newData._id}" was succesfully updated`;
        res.status(201).json({ status: "ok", data: newData });
        console.log(message);
        return;
      }
    } catch (e: any) {
      res.status(400).json({ status: "error", message: e });
    }
  }
  public static getSingleRepair(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    try {
      const { id } = req.query;
      let singleRepair = RepairLocal.getSingleRepair(id);
      if (singleRepair) {
        res.status(200).json({ status: "ok", data: singleRepair });
        return;
      }
      throw `Request id ${id} not found.`;
    } catch (e: any) {
      res.status(400).json({ status: "ok", message: e });
    }
  }
}

const needed_keys = [
  "device",
  "customer",
  "payment",
  "technician",
  "_id",
  "invoiceId",
  "status",
  "branchOffice",
  "admissionDate",
  "createdBy",
];

const check_keys = (data: RepairData, keys: string[]) => {
  // Object in wich keys are going to be evaluated.
  let missingKeys = [];
  let objectKeys = Object.keys(data);
  for (let key of keys) {
    if (objectKeys.indexOf(key) == -1) {
      missingKeys.push(key);
    }
  }
  return missingKeys;
};
