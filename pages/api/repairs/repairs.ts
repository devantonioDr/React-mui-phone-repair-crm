// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import RepairLocal from "../../../data/Repair/RepairLocal";
import { RepairData } from "../../../types/Template";

type Data = {
  status: "ok" | "error";
  message?: string;
  data?: RepairData[] | RepairData;
};
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.method);
  //   Get all repairs.
  if (req.method == "GET") {
    try {
      const repairs = RepairLocal.all();
      res.status(200).json({ status: "ok", data: repairs });
    } catch (e: any) {
      res.status(200).json({ status: "error", message: e });
    }
  }
  //  Update repair.
  if (req.method == "PUT") {
    try {
      let data = JSON.parse(req.body);

      // Check if body object has all needed keys
      let missingKeys = check_keys(data, needed_keys);
      if (missingKeys.length > 0) {
        let message = `Keys ${missingKeys} are missing.`;
        res.status(400).json({ status: "error", message });
        console.log(message);
        return;
      }
      // Put request succeded.
      let newData = RepairLocal.updateRepair(data);
      if (newData) {
        let message = `Resource with id "${newData._id}" was succesfully updated`;
        res.status(201).json({ status: "ok", data: newData });
        console.log(message);
        return;
      }
    } catch (e: any) {
      res.status(200).json({ status: "error", message: e });
    }
  }
  //   Delete Repair.
  if (req.method == "DELETE") {
    try {
      let data = JSON.parse(req.body);
      // If _id is not present in the request.
      if (!data._id) {
        let message = `Id ${data._id} missing in the request body.`;
        res.status(400).json({ status: "error", message });
        console.log(message);
        return;
      }
      // try and delete the resource.
      let newData = RepairLocal.deleteRepair(data._id);
      if (newData) {
        let message = `Id ${data._id} deleted succesfully.`;
        res.status(201).json({ status: "ok", message });
        console.log(message);
        return;
      }

      let message = `Id ${data._id} was not found.`;
      res.status(400).json({ status: "error", message });
    } catch (e: any) {
      res.status(200).json({ status: "error", message: e });
    }
  }
 
}
