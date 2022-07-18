// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { RepairController } from "../../../controllers/repairController";
import RepairLocal from "../../../data/Repair/local/RepairLocal";

type Data = {
  status: "ok" | "error";
  message?: string;
  data?: RepairData[] | RepairData;
};


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   Get all repairs.
  if (req.method == "GET") {
    RepairController.getAll(req, res);
    return;
  }
  //  Update repair.
  if (req.method == "PUT") {
    RepairController.updateRepair(req, res);
    return;
  }
  //   Delete Repair.
  if (req.method == "DELETE") {
    RepairController.deleteRepair(req, res);
    return;
  }
  res.status(400).json({ status: "error", message: "method not allow" });
}
